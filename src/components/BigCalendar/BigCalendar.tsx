import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
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
import { getWeek, getMonth } from '../../utils/date/date';
import {
  BigCalendarEvent,
  BigCalendarResource,
  getUniqueJobGroup,
} from './helper';
import { BigCalendarEventWeek } from './BigCalendarEvent/BigCalendarEventWeek/BigCalendarEventWeek';
import { BigCalendarEventDay } from './BigCalendarEvent/BigCalendarEventDay/BigCalendarEventDay';
import { BigCalendarEventMonth } from './BigCalendarEvent/BigCalendarEventMonth/BigCalendarEventMonth';

const DnDCalendar = withDragAndDrop(
  Calendar as React.ComponentType<CalendarProps<object, object>>
) as React.FC<CalendarProps>;

moment.locale('RU');
const localizer = momentLocalizer(moment);

const cnBigCalendar = cn('BigCalendar');

type ChangeDate = (
  date: Date[] | { start: Date; end: Date },
  view?: ViewMode | 'work_week' | 'agenda'
) => void;

type Props = {
  className?: string;
  mode?: ViewMode;
  changeEvents?: (
    newEvents: BigCalendarEvent<Job>[],
    errorCallback: () => void
  ) => void;
  date?: Date | [Date, Date];
  onChangeDate?: ChangeDate;
  items?: Job[];
  minDate?: Date;
  maxDate?: Date;
  changeView?: (view: ViewMode) => void;
  changeDate?: (date: [Date, Date]) => void;
  loading?: boolean;
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
    items = [],
    changeView,
    changeEvents,
    changeDate,
  } = props;

  const [events, setEvents] = useState<BigCalendarEvent<Job>[]>([]);
  const [resources, setResources] = useState<BigCalendarResource[]>([]);

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

  useEffect(() => {
    const elements = getUniqueJobGroup(items);
    let eventsArr: BigCalendarEvent<Job>[] = [];
    const resourcesArr: BigCalendarResource[] = [];
    elements.forEach((el) => {
      eventsArr = events.concat(el.items);
      resourcesArr.push(el.group);
    });
    setEvents(eventsArr);
    setResources(resourcesArr);
  }, [items]);

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.isDraggable
        ? { className: 'isDraggable' }
        : { className: 'nonDraggable' }),
    }),
    []
  );

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
      setEvents((prev) => {
        const existing =
          prev.find((ev) => ev.id === event.id) ??
          ({} as BigCalendarEvent<Job>);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        const res = [...filtered, { ...existing, start, end }];
        changeEvents?.(res, () => setEvents(prev));
        return changeEvents ? res : prev;
      });
    },
    [changeEvents, setEvents]
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const copyEvent = { ...event } as BigCalendarEvent<Job>;
      const { allDay } = copyEvent;
      if (!allDay && droppedOnAllDaySlot) {
        copyEvent.allDay = true;
      }

      setEvents((prev) => {
        const existing =
          prev.find((ev) => ev.id === copyEvent.id) ??
          ({} as BigCalendarEvent<Job>);
        const filtered = prev.filter((ev) => ev.id !== copyEvent.id);
        const res = [...filtered, { ...existing, start, end, allDay }];
        changeEvents?.(res, () => setEvents(prev));
        return changeEvents ? res : prev;
      });
    },
    [changeEvents, setEvents]
  );

  const haveAllDay = useMemo(() => {
    return !!events.find((el) => !!el.allDay);
  }, [events]);

  return (
    <div className={cnBigCalendar({ loading, haveAllDay }, [className])}>
      {loading && (
        <div className={cnBigCalendar('Loader')}>
          <Loader size="m" />
        </div>
      )}
      <DnDCalendar
        className={cnBigCalendar('Container')}
        localizer={localizer}
        events={events}
        resources={mode === 'day' ? resources : undefined}
        onRangeChange={onChangeDate}
        eventPropGetter={eventPropGetter}
        view={mode}
        // @ts-ignore
        onEventResize={resizeEvent}
        onEventDrop={moveEvent}
        onNavigate={handleChangeDate}
        onView={(view) => changeView?.(view as ViewMode)}
        resourceIdAccessor={() => 'resourceId'}
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
