import React from 'react';
import { HeaderProps } from 'react-big-calendar';
import moment from 'moment';
import { Text } from '@consta/uikit/Text';
import { getWeekday } from '../../../../utils/date/date';
import { cn } from '../../../../__private__/utils/bem';

import './BigCalendarHeaderMonth.scss';

const cnBigCalendarHeaderMonth = cn('BigCalendarHeaderMonth');

export const BigCalendarHeaderMonth = (props: HeaderProps) => {
  const { date } = props;

  const targetDate = moment(date).locale('ru');

  return (
    <div className={cnBigCalendarHeaderMonth()}>
      <Text view="secondary" size="l" lineHeight="s" align="left">
        {getWeekday(targetDate.toDate().getDay())}
      </Text>
    </div>
  );
};
