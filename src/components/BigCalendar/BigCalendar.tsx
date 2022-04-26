import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { cn } from '../../__private__/utils/bem';

import './BigCalendar.scss';
import { Job, ViewMode } from '../../types/timetable';
import { BigCalendarHeaderWeek } from './BigCalendarHeader/BigCalendarHeaderWeek/BigCalendarHeaderWeek';
import { BigCalendarHeaderMonth } from './BigCalendarHeader/BigCalendarHeaderMonth/BigCalendarHeaderMonth';
import { BigCalendarHeaderDay } from './BigCalendarHeader/BigCalendarHeaderDay/BigCalendarHeaderDay';
import { Loader } from '@consta/uikit/Loader';
import { getWeek, getMonth } from '../../utils/date/date';
import {
  BigCalendarEvent,
  BigCalendarResource,
  getUniqueJobGroup,
} from './helper';

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
    changeDate,
  } = props;

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

  const data = useMemo(() => {
    const elements = getUniqueJobGroup(items);
    let events: BigCalendarEvent<Job>[] = [];
    const resources: BigCalendarResource[] = [];
    elements.forEach((el) => {
      events = events.concat(el.items);
      resources.push(el.group);
    });
    return {
      resources,
      events,
    };
  }, [items]);

  const handleChangeDate = (date: Date) => {
    if (mode !== 'month') {
      const dates = getWeek<true>({ date });
      changeDate?.([dates.startWeek, dates.endWeek]);
    } else {
      const dates = getMonth<true>({ date });
      changeDate?.([dates.startMonth, dates.endMonth]);
    }
  };

  return (
    <div className={cnBigCalendar({ loading }, [className])}>
      {loading && (
        <div className={cnBigCalendar('Loader')}>
          <Loader size="m" />
        </div>
      )}
      <Calendar
        className={cnBigCalendar('Container')}
        localizer={localizer}
        events={data.events}
        resources={mode === 'day' ? data.resources : undefined}
        onRangeChange={onChangeDate}
        view={mode}
        onNavigate={handleChangeDate}
        onView={(view) => changeView?.(view as ViewMode)}
        resourceIdAccessor="resourceId"
        date={Array.isArray(date) ? date[0] : date}
        components={{
          week: {
            header: BigCalendarHeaderWeek,
          },
          month: {
            header: BigCalendarHeaderMonth,
          },
          day: {
            header: BigCalendarHeaderDay,
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
