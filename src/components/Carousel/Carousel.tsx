import React, { forwardRef, useEffect, useState } from 'react';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { Button } from '@consta/uikit/Button';
import { useFlag } from '@consta/uikit/useFlag';
import { CarouselComponent, CarouselProps } from './types';
import { getItems, withDefaultGetters } from './helpers';
import { cn } from '../../__private__/utils/bem';
import { CarouselItem } from './CarouselItem/CarouselItem';

import './Carousel.scss';
import { CarouselNotFound } from './CarouselNotFound/CarouselNotFound';
import { CarouselControl } from './CarouselControl/CarouselControl';

const cnCarousel = cn('Carousel');

function CarouselRender(props: CarouselProps, ref: React.Ref<HTMLDivElement>) {
  const {
    items,
    onItemClick,
    renderItem,
    emptyItemsText = 'Хм, кажется, картинка не загрузилась.',
    getItemKey,
    getItemLabel,
    withControls = false,
    getItemOnClick,
    getItemSrc,
    ...otherProps
  } = withDefaultGetters(props);
  type Item = typeof items[number];
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [activeKey, setActiveKey] = useState<string>();
  const [isButtonLocked, { on, off }] = useFlag(false);

  useEffect(() => {
    if (items.length > 0) {
      setActiveKey(getItemKey(items[0]));
      setVisibleItems(
        getItems({
          items,
          activeKey: getItemKey(items[0]),
          getItemKey,
          getItemLabel,
          getItemSrc,
          getItemOnClick,
        })
      );
    }
  }, []);

  const getActiveItemIndex = (): number => {
    const currentItem =
      visibleItems.find((item) => getItemKey(item) === activeKey) ?? items[0];
    return visibleItems.indexOf(currentItem);
  };

  const changeItem = (type: 'previous' | 'next') => {
    if (!isButtonLocked) {
      const index = getActiveItemIndex();
      on();
      setActiveKey(
        getItemKey(visibleItems[index + 1 * (type === 'previous' ? -1 : 1)])
      );
      setTimeout(() => {
        setVisibleItems(
          getItems({
            items,
            activeKey: getItemKey(
              visibleItems[index + 1 * (type === 'previous' ? -1 : 1)]
            ),
            getItemKey,
            getItemLabel,
            getItemSrc,
            getItemOnClick,
          })
        );
      }, 500);
    }
  };

  const changeByControl = (id: number) => {
    on();
    setActiveKey(getItemKey(visibleItems[id]));
    setTimeout(() => {
      setVisibleItems(
        getItems({
          items,
          activeKey: getItemKey(visibleItems[id]),
          getItemKey,
          getItemLabel,
          getItemSrc,
          getItemOnClick,
        })
      );
    }, 500);
  };

  useEffect(() => {
    if (visibleItems.length > 1 && getItemKey(visibleItems[1]) === activeKey) {
      setTimeout(off, 200);
    }
  }, [JSON.stringify(visibleItems)]);

  const hasItems = Array.isArray(items) && items.length > 0;
  const withArrows = hasItems && items.length > 1;

  const handleClick = (e: React.MouseEvent, item: Item) => {
    onItemClick?.({ e, item });
  };

  return (
    <div className={cnCarousel()} ref={ref} {...otherProps}>
      {hasItems && withArrows && (
        <Button
          className={cnCarousel('Button', { position: 'left' })}
          onlyIcon
          view="clear"
          size="l"
          iconLeft={IconArrowLeft}
          onClick={() => changeItem('previous')}
        />
      )}
      <div className={cnCarousel('Container')}>
        {!hasItems ? (
          <CarouselNotFound label={emptyItemsText} />
        ) : (
          visibleItems.map((item, index) => {
            const itemIndex = getActiveItemIndex();
            return (
              <div
                key={cnCarousel(`Item-${getItemKey(item)}`)}
                className={cnCarousel('Item', {
                  active: getItemKey(item) === activeKey,
                  disabled: isButtonLocked || getItemKey(item) !== activeKey,
                })}
                style={{
                  ['--carousel-item-left' as string]: `${
                    (index - itemIndex) * 100
                  }%`,
                }}
                onClick={(e) => handleClick(e, item)}
              >
                {renderItem ? renderItem?.(item) : <CarouselItem {...item} />}
              </div>
            );
          })
        )}
        {withControls && (
          <CarouselControl
            onClick={changeByControl}
            length={Math.min(items.length, 7)}
            className={cnCarousel('Controls')}
          />
        )}
      </div>
      {hasItems && withArrows && (
        <Button
          className={cnCarousel('Button', { position: 'right' })}
          onlyIcon
          view="clear"
          size="l"
          iconLeft={IconArrowRight}
          onClick={() => changeItem('next')}
        />
      )}
    </div>
  );
}

export const Carousel = forwardRef(CarouselRender) as CarouselComponent;
