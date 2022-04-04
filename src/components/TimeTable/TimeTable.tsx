import React, { forwardRef, useRef, useState } from 'react';
import { TimeTableProps, TimeTableComponent } from './types';
import { cn } from '../../__private__/utils/bem';
import { useTimeTable } from './useTimeTable/useTimeTable';
import { TimeTableHeader } from './TimeTableHeader/TimeTableHeader';
import { useForkRef } from '@consta/uikit/__internal__/src/hooks/useForkRef/useForkRef';

import './TimeTable.scss';
import { getGridTemplateColumns, getItem, withDefaultGetters } from './helper';
import { TimeTableRow } from './TimeTableRow/TimeTableRow';
import { useRefSizes } from '../../hooks/useRefSizes/useRefSizes';
import { TimeTableCard } from './TimeTableCard/TimeTableCard';

const cnTimeTable = cn('TimeTable');

const TimeTableRender = (
  propsComponent: TimeTableProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const props = withDefaultGetters(propsComponent);
  const {
    items,
    type,
    className,
    date = new Date(),
    containerRef,
    getItemStartDate,
    getItemEndDate,
    onItemClick,
  } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const { width } = useRefSizes(containerRef);

  const timeTableRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const {
    titleItems,
    refs,
    columns,
    times,
    sortedItems,
    getRefsForItem,
    getCardPosition,
  } = useTimeTable({
    items,
    mode: type,
    minTime: 8,
    maxTime: 18,
    targetDate: date,
    getItemStartDate,
    getItemEndDate,
  });

  const onHover = (index: number, flag: boolean) => {
    setHoveredIndex(flag ? index : -1);
  };

  return (
    <div
      className={cnTimeTable(null, [className])}
      ref={useForkRef([timeTableRef, ref])}
      style={{
        ['--time-table-width' as string]: width
          ? `${width}px`
          : `calc(100% + 2 * var(--space-2xl))`,
      }}
    >
      <div
        className={cnTimeTable('Container')}
        style={{
          ['--table-grid-template-columns' as string]: getGridTemplateColumns(
            columns,
            columns > 6
              ? undefined
              : `calc(${100 / columns}% - ${64 / columns}px)`
          ),
        }}
      >
        <TimeTableHeader
          onElementHover={({ index, flag }) => onHover(index, flag)}
          className={cnTimeTable('Header')}
          list={titleItems}
          columns={columns}
          hoveredIndex={hoveredIndex}
        />
        <div className={cnTimeTable('Body')} ref={bodyRef}>
          {times.map((time, itemIndex) => (
            <TimeTableRow
              label={time}
              key={cnTimeTable(`Row-${itemIndex}`)}
              onElementHover={({ index, flag }) => onHover(index, flag)}
              refs={refs[time]}
              columns={columns}
              hoveredIndex={hoveredIndex}
              className={cnTimeTable('Row')}
              isLast={itemIndex === times.length - 1}
            />
          ))}
          {sortedItems.map((item) => (
            <TimeTableCard
              getCardPosition={getCardPosition}
              offsetX={8}
              offsetY={8}
              onCardInfoClick={(e) => onItemClick?.({ e, item })}
              {...getItem(item, props)}
              {...getRefsForItem(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TimeTable = forwardRef(TimeTableRender) as TimeTableComponent;
