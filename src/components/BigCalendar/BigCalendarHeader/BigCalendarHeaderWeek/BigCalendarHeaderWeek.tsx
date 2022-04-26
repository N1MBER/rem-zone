import React from 'react';
import { HeaderProps } from 'react-big-calendar';
import moment from 'moment';
import { Text } from '@consta/uikit/Text';
import { getWeekday } from '../../../../utils/date/date';
import { cn } from '../../../../__private__/utils/bem';

import './BigCalendarHeaderWeek.scss';

const cnBigCalendarHeaderWeek = cn('BigCalendarHeaderWeek');

export const BigCalendarHeaderWeek = (props: HeaderProps) => {
  const { date } = props;

  const targetDate = moment(date).locale('ru');

  return (
    <div className={cnBigCalendarHeaderWeek()}>
      <Text
        className={cnBigCalendarHeaderWeek('Weekday')}
        size="m"
        lineHeight="s"
        align="left"
      >
        {getWeekday(targetDate.toDate().getDay())}
      </Text>
      <Text size="l" lineHeight="s" align="left">
        {targetDate.format('DD MMM')}
      </Text>
    </div>
  );
};
