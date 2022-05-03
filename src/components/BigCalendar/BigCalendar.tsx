import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import {
  Calendar,
  CalendarProps,
  momentLocalizer,
  SlotInfo,
} from 'react-big-calendar';
import moment from 'moment';
import { cn } from '../../__private__/utils/bem';

import './BigCalendar.scss';
import { Job, ViewMode } from '../../types/timetable';
import { BigCalendarHeaderWeek } from './BigCalendarHeader/BigCalendarHeaderWeek/BigCalendarHeaderWeek';
import { BigCalendarHeaderMonth } from './BigCalendarHeader/BigCalendarHeaderMonth/BigCalendarHeaderMonth';
import { BigCalendarHeaderDay } from './BigCalendarHeader/BigCalendarHeaderDay/BigCalendarHeaderDay';
import { Loader } from '@consta/uikit/Loader';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { getWeek, getMonth, compareDates } from '../../utils/date/date';
import { BigCalendarEvent, BigCalendarResource } from './helper';
import { BigCalendarEventWeek } from './BigCalendarEvent/BigCalendarEventWeek/BigCalendarEventWeek';
import { BigCalendarEventDay } from './BigCalendarEvent/BigCalendarEventDay/BigCalendarEventDay';
import { BigCalendarEventMonth } from './BigCalendarEvent/BigCalendarEventMonth/BigCalendarEventMonth';

const DnDCalendar = withDragAndDrop(
  Calendar as React.ComponentType<CalendarProps<object, object>>
) as React.FC<CalendarProps>;

moment.locale('RU');
const localizer = momentLocalizer(moment);

const cnBigCalendar = cn('BigCalendar');

type Range = { start: Date; end: Date };

type ChangeDate = (
  date: Date[] | Range,
  view?: ViewMode | 'work_week' | 'agenda'
) => void;

type Props = {
  className?: string;
  mode?: ViewMode;
  changeEvent?: (newEvents: BigCalendarEvent<Job>) => void;
  date?: Date | [Date, Date];
  onChangeDate?: ChangeDate;
  items?: BigCalendarEvent<Job>[];
  minDate?: Date;
  maxDate?: Date;
  changeView?: (view: ViewMode) => void;
  changeDate?: (date: [Date, Date]) => void;
  loading?: boolean;
  resources?: BigCalendarResource[];
  onCellClick?: (slot: SlotInfo) => void;
  onCellSelect?: (range: Range) => void;
  onEventClick?: (event: BigCalendarEvent<Job>) => void;
};

export const BigCalendar = (props: Props) => {
  const {
    className,
    minDate,
    maxDate,
    mode = 'week',
    date,
    onChangeDate,
    loading,
    resources,
    items,
    changeView,
    changeEvent,
    changeDate,
    onEventClick,
    onCellClick,
    onCellSelect,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  const min = useMemo(() => {
    const date = new Date();
    date.setHours(8);
    date.setMinutes(0);
    return minDate ?? date;
  }, [minDate]);

  const max = useMemo(() => {
    const date = new Date();
    date.setHours(23);
    date.setMinutes(0);
    return maxDate ?? date;
  }, [maxDate]);

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.isDraggable
        ? { className: 'isDraggable' }
        : { className: 'nonDraggable' }),
    }),
    []
  );

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo(0, 0);
    }
  }, [mode, date]);

  const handleChangeDate = (date: Date) => {
    if (mode !== 'month') {
      const dates = getWeek<true>({ date });
      changeDate?.([dates.startWeek, dates.endWeek]);
    } else {
      const dates = getMonth<true>({ date });
      changeDate?.([dates.startMonth, dates.endMonth]);
    }
  };

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      const allDay = !compareDates(start, end);
      const copyEvent = { ...event } as BigCalendarEvent<Job>;
      copyEvent.start = start;
      copyEvent.end = end;
      copyEvent.allDay = allDay;
      changeEvent?.(copyEvent);
    },
    [changeEvent]
  );

  const moveEvent = useCallback(
    ({ event, start, end }) => {
      const allDay = !compareDates(start, end);
      const copyEvent = { ...event } as BigCalendarEvent<Job>;
      copyEvent.start = start;
      copyEvent.end = end;
      copyEvent.allDay = allDay;
      changeEvent?.(copyEvent);
    },
    [changeEvent]
  );

  const haveAllDay = useMemo(() => {
    return !!items?.find((el) => !!el.allDay);
  }, [items, mode]);

  const clickRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const onSelectSlot = (slotInfo: SlotInfo) => {
    clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      onCellClick?.(slotInfo);
    }, 500);
  };

  const onSelecting = useCallback((range: Range): boolean | undefined => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      onCellSelect?.(range);
    }, 250);
    return true;
  }, []);

  return (
    <div
      className={cnBigCalendar({ mode, loading, haveAllDay }, [className])}
      ref={rootRef}
    >
      {loading && (
        <div className={cnBigCalendar('Loader')}>
          <Loader size="m" />
        </div>
      )}
      <DnDCalendar
        className={cnBigCalendar('Container')}
        localizer={localizer}
        events={items}
        resources={mode === 'day' ? resources : undefined}
        onRangeChange={onChangeDate}
        eventPropGetter={eventPropGetter}
        view={mode}
        // @ts-ignore
        onEventResize={resizeEvent}
        onEventDrop={moveEvent}
        selectable
        popup
        onNavigate={handleChangeDate}
        onSelectEvent={(data) => onEventClick?.(data as BigCalendarEvent<Job>)}
        onSelecting={onSelecting}
        onSelectSlot={onSelectSlot}
        onView={(view) => changeView?.(view as ViewMode)}
        // Проблема с типами, так как передавая accessor функцией работать не будет
        // @ts-ignore
        resourceIdAccessor="id"
        // Проблема с типами, так как передавая accessor функцией работать не будет
        // @ts-ignore
        resourceTitleAccessor="title"
        date={Array.isArray(date) ? date[0] : date}
        components={{
          week: {
            header: BigCalendarHeaderWeek,
            event: BigCalendarEventWeek,
          },
          month: {
            header: BigCalendarHeaderMonth,
            event: BigCalendarEventMonth,
          },
          day: {
            header: BigCalendarHeaderDay,
            event: BigCalendarEventDay,
          },
        }}
        startAccessor="start"
        endAccessor="end"
        min={min}
        max={max}
      />
    </div>
  );
};
