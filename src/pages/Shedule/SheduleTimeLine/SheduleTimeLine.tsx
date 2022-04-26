import React, { useEffect, useMemo, useState } from 'react';
import { ViewMode } from '../../../types/timetable';
import { Tabs } from '@consta/uikit/Tabs';
import { getItems } from './helper';
import { cn } from '../../../__private__/utils/bem';
import { useRefSizes } from '../../../hooks/useRefSizes/useRefSizes';
import { compareDates } from '../../../utils/date/date';

import './SheduleTimeLine.scss';

export type ViewDate<TYPE> = TYPE extends 'day' ? Date : [Date, Date];

type Props<TYPE extends ViewMode> = {
  viewMode: TYPE;
  onChangeDate?: (dates: ViewDate<TYPE>) => void;
  currentDate?: Date;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
};

const cnSheduleTimeLine = cn('SheduleTimeLine');

export function SheduleTimeLine<TYPE extends ViewMode>(props: Props<TYPE>) {
  const {
    viewMode = 'day',
    onChangeDate,
    currentDate = new Date(),
    className,
    containerRef,
  } = props;

  const items = useMemo(() => {
    return getItems(viewMode, currentDate);
  }, [viewMode, currentDate]);

  const [active, setActive] = useState<typeof items[number] | undefined>(
    items[0]
  );

  const { width } = useRefSizes(containerRef);

  useEffect(() => {
    const activeItem = items.find((item) => {
      if (
        viewMode === 'day' &&
        !Array.isArray(item.date) &&
        compareDates(item.date, currentDate)
      )
        return true;
      if (
        viewMode === 'week' &&
        Array.isArray(item.date) &&
        item.date[0] <= currentDate &&
        item.date[1] > currentDate
      )
        return true;
      if (
        viewMode === 'month' &&
        Array.isArray(item.date) &&
        item.date[0] <= currentDate &&
        item.date[1] > currentDate
      )
        return true;
      return false;
    });
    setActive(activeItem);
  }, [currentDate, typeof currentDate, viewMode]);

  return (
    <div
      style={{
        ['--time-line-width' as string]: width
          ? `${width}px`
          : 'calc(100vw - 384px)',
      }}
      className={cnSheduleTimeLine(null, [className])}
    >
      <Tabs
        items={items}
        value={active}
        size="s"
        fitMode="scroll"
        getLabel={(item) => item.label}
        onChange={({ value }) =>
          value && onChangeDate?.(value.date as ViewDate<TYPE>)
        }
      />
    </div>
  );
}
