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

const cnCarousel = cn('Carousel');

function CarouselRender(props: CarouselProps, ref: React.Ref<HTMLDivElement>) {
  const {
    items,
    onItemClick,
    renderItem = CarouselItem,
    emptyItemsText = 'Хм, кажется, картинка не загрузилась.',
    getItemKey,
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
          })
        );
      }, 500);
    }
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
                {renderItem?.(item)}
              </div>
            );
          })
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
