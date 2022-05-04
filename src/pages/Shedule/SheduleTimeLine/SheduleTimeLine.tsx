import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ViewMode } from '../../../types/timetable';
import { Tabs } from '@consta/uikit/Tabs';
import { getItems } from './helper';
import { cn } from '../../../__private__/utils/bem';
import { useRefSizes } from '../../../hooks/useRefSizes/useRefSizes';
import { compareDates } from '../../../utils/date/date';
import { Button } from '@consta/uikit/Button';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useFlag } from '@consta/uikit/useFlag';
import { Tooltip } from '@consta/uikit/Tooltip';
import { DateTime } from '@consta/uikit/DateTimeCanary';

import './SheduleTimeLine.scss';

export type ViewDate<TYPE> = TYPE extends 'day' ? Date : [Date, Date];

type Props<TYPE extends ViewMode> = {
  viewMode: TYPE;
  onChangeDate?: (dates: ViewDate<TYPE>) => void;
  currentDate?: Date;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  onChangeActive?: (dates: ViewDate<TYPE>) => void;
};

const cnSheduleTimeLine = cn('SheduleTimeLine');

export function SheduleTimeLine<TYPE extends ViewMode>(props: Props<TYPE>) {
  const {
    viewMode = 'day',
    onChangeDate,
    currentDate,
    className,
    containerRef,
    onChangeActive,
  } = props;

  const items = useMemo(() => {
    return getItems(viewMode, currentDate);
  }, [viewMode, currentDate]);

  const [active, setActive] = useState<typeof items[number] | undefined>(
    items[0]
  );

  const [showCalendar, setShowCalendar] = useFlag();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { width } = useRefSizes(containerRef);

  useEffect(() => {
    const targetDate = currentDate ?? new Date();
    const activeItem = items.find((item) => {
      if (
        viewMode === 'day' &&
        !Array.isArray(item.date) &&
        compareDates(item.date, targetDate)
      )
        return true;
      if (
        viewMode === 'week' &&
        Array.isArray(item.date) &&
        item.date[0] <= targetDate &&
        item.date[1] > targetDate
      )
        return true;
      if (
        viewMode === 'month' &&
        Array.isArray(item.date) &&
        item.date[0] <= targetDate &&
        item.date[1] > targetDate
      )
        return true;
      return false;
    });
    active?.label !== activeItem?.label &&
      onChangeActive?.(activeItem?.date as ViewDate<TYPE>);
    setActive(activeItem);
  }, [viewMode, currentDate, typeof currentDate, items]);

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
        className={cnSheduleTimeLine('Tabs')}
        fitMode="scroll"
        getLabel={(item) => item.label}
        onChange={({ value }) =>
          value && onChangeDate?.(value.date as ViewDate<TYPE>)
        }
      />
      <Button
        onlyIcon
        view="secondary"
        iconLeft={IconCalendar}
        size="s"
        ref={buttonRef}
        onClick={setShowCalendar.toogle}
      />
      {showCalendar && (
        <Tooltip
          anchorRef={buttonRef}
          direction="upStartRight"
          possibleDirections={[
            'downCenter',
            'downLeft',
            'leftDown',
            'leftCenter',
          ]}
          onClickOutside={setShowCalendar.off}
        >
          <DateTime
            type="month"
            style={{
              zIndex: 200,
            }}
            onChange={({ value }) =>
              value && onChangeDate?.(value as ViewDate<TYPE>)
            }
          />
        </Tooltip>
      )}
    </div>
  );
}
