import React from 'react';
import { TitleItem } from '../useTimeTable/useTimeTable';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './TimeTableHeader.scss';
import { cnTimeTableRow } from '../TimeTableRow/TimeTableRow';

type Element = TitleItem<'day'> | TitleItem<'week'>;

type Props = {
  list: Element[];
  hoveredIndex?: number;
  className?: string;
  columns: number;
  onElementHover?: (params: {
    index: number;
    item?: Element;
    flag: boolean;
  }) => void;
};

const cnTimeTableHeader = cn('TimeTableHeader');

function renderItem(item: Element, hovered?: boolean) {
  // @ts-ignore
  if (item?.weekDay) {
    const titleItem = { ...item } as TitleItem<'week'>;
    return (
      <>
        <Text
          view={!hovered ? 'secondary' : 'link'}
          size="m"
          lineHeight="s"
          align="left"
        >
          {titleItem.weekDay}
        </Text>
        <Text
          view={!hovered ? 'primary' : 'link'}
          size="l"
          lineHeight="s"
          align="left"
        >
          {titleItem.day.slice(0, 6)}
        </Text>
      </>
    );
  }
  const titleItem = { ...item } as TitleItem<'day'>;
  return (
    <Text
      view={!hovered ? 'primary' : 'link'}
      size="l"
      lineHeight="s"
      align="left"
    >
      {titleItem.name}
    </Text>
  );
}

export function TimeTableHeader(props: Props) {
  const { list, onElementHover, hoveredIndex, className, columns } = props;

  const handleMouseAction = (flag: boolean, index: number) => {
    onElementHover?.({
      item: list[index],
      flag,
      index,
    });
  };

  return (
    <div className={cnTimeTableHeader(null, [cnTimeTableRow(), className])}>
      <div className={cnTimeTableRow('Time')} />
      {(list && list.length > 0 ? list : Array(columns).fill(null)).map(
        (item, index) => {
          // @ts-ignore
          const weekMode = !!item?.weekDay;
          return (
            <div
              onMouseEnter={() => handleMouseAction(true, index)}
              onMouseLeave={() => handleMouseAction(false, index)}
              key={cnTimeTableHeader(`Item-${index}`)}
              className={cnTimeTableHeader(
                'Item',
                {
                  mode: weekMode ? 'week' : 'day',
                },
                [cnTimeTableRow('Item', { hovered: hoveredIndex === index })]
              )}
            >
              {renderItem(item, hoveredIndex === index)}
            </div>
          );
        }
      )}
    </div>
  );
}
