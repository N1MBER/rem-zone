import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../../../__private__/utils/bem';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { cnMixFocus } from '@consta/uikit/MixFocus';
import moment from 'moment';
import { Text } from '@consta/uikit/Text';
import { Popover } from '@consta/uikit/Popover';
import './HeaderCalendar.scss';
import { useFlag } from '@consta/uikit/useFlag';
import { DateTime } from '@consta/uikit/DateTimeCanary';

const cnHeaderCalendar = cn('HeaderCalendar');

const minute = 60000;

export const HeaderCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useFlag(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, minute);
    return () => clearInterval(interval);
  }, []);

  const buttonsRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonsRef}
        onClick={setShowCalendar.toogle}
        type="button"
        className={cnHeaderCalendar(null, [cnMixFocus()])}
      >
        <IconCalendar size="m" />
        <div className={cnHeaderCalendar('Date')}>
          <Text align="right" size="m" view="primary" lineHeight="2xs">
            {moment(date).locale('ru').format('DD MMMM')}
          </Text>
          <Text align="right" size="xs" view="secondary" lineHeight="2xs">
            {moment(date).locale('ru').format('HH:mm')}
          </Text>
        </div>
      </button>
      {showCalendar && (
        <Popover
          className={cnHeaderCalendar('Calendar')}
          onClickOutside={setShowCalendar.off}
          possibleDirections={['downCenter', 'downStartLeft', 'downStartRight']}
          direction="downCenter"
          offset="m"
          arrowOffset={12}
          anchorRef={buttonsRef}
        >
          <DateTime type="date" currentVisibleDate={date} />
        </Popover>
      )}
    </>
  );
};
