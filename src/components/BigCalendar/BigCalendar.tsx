import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { cn } from '../../__private__/utils/bem';

import './BigCalendar.scss';

moment.locale('RU');
const localizer = momentLocalizer(moment);

const cnBigCalendar = cn('BigCalendar');

export const BigCalendar = () => {
  return (
    <div className="myCustomHeight">
      <Calendar
        className={cnBigCalendar()}
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
