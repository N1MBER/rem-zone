import React from 'react';
import { HeaderProps } from 'react-big-calendar';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../../__private__/utils/bem';

import './BigCalendarHeaderDay.scss';

const cnBigCalendarHeaderDay = cn('BigCalendarHeaderDay');

export const BigCalendarHeaderDay = (props: HeaderProps) => {
  const { label } = props;

  return (
    <div className={cnBigCalendarHeaderDay()}>
      <Text size="l" lineHeight="s" align="left">
        {label}
      </Text>
    </div>
  );
};
