import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { cn } from '../../__private__/utils/bem';

import './BigCalendar.scss';
import { ViewMode } from '../../types/timetable';
import { BigCalendarHeaderWeek } from './BigCalendarHeader/BigCalendarHeaderWeek/BigCalendarHeaderWeek';
import { BigCalendarHeaderMonth } from './BigCalendarHeader/BigCalendarHeaderMonth/BigCalendarHeaderMonth';
import { BigCalendarHeaderDay } from './BigCalendarHeader/BigCalendarHeaderDay/BigCalendarHeaderDay';
import { Loader } from '@consta/uikit/Loader';

moment.locale('RU');
const localizer = momentLocalizer(moment);

const cnBigCalendar = cn('BigCalendar');

type ChangeDate = (
  date: Date[] | { start: Date; end: Date },
  view?: ViewMode | 'work_week' | 'agenda'
) => void;

type Props = {
  className?: string;
  mode?: 'month' | 'week' | 'day';
  date?: Date | [Date, Date];
  onChangeDate?: ChangeDate;
  minDate?: Date;
  maxDate?: Date;
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
  } = props;

  const min = useMemo(() => {
    const date = new Date();
    date.setHours(8);
    date.setMinutes(0);
    return minDate ?? date;
  }, [minDate]);

  const max = useMemo(() => {
    const date = new Date();
    date.setHours(21);
    date.setMinutes(0);
    return maxDate ?? date;
  }, [maxDate]);

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
        events={[]}
        onRangeChange={onChangeDate}
        view={mode}
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
