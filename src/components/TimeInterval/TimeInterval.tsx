import React, { CSSProperties, useRef, useState } from 'react';
import { cn } from '../../__private__/utils/bem';
import { DateTime } from '@consta/uikit/DateTimeCanary';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { FieldLabel } from '@consta/uikit/FieldLabel';
import { Popover } from '@consta/uikit/Popover';
import { useFlag } from '@consta/uikit/useFlag';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import {
  getCurrnetDate,
  getDatesInitialInterval,
  getIntervalToString,
} from './helper';

import './TimeInterval.scss';

type Props = {
  onChange?: (params: {
    e: React.MouseEvent<HTMLButtonElement>;
    value: [Date, Date];
  }) => void;
  value?: [Date?, Date?];
  minDate?: Date;
  size?: 's' | 'm' | 'l' | 'xs';
  title?: string;
  maxDate?: Date;
  currentVisibleDate?: Date;
  style?: CSSProperties;
  label?: string;
  className?: string;
};

const cnTimeInterval = cn('TimeInterval');

export const TimeInterval = (props: Props) => {
  const {
    onChange,
    value,
    title,
    size = 'm',
    style,
    className,
    maxDate,
    minDate,
    label,
    currentVisibleDate: currentVisibleDateProp,
  } = props;

  const [showPopover, setShowPopover] = useFlag(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const currentVisibleDate = getDatesInitialInterval(
    currentVisibleDateProp ?? getCurrnetDate()
  );

  const [timeRange, setTimeRange] = useState<[Date, Date]>([
    value && value[0] ? value[0] : currentVisibleDate[0],
    value && value[1] ? value[1] : currentVisibleDate[1],
  ]);

  const changeDate = (params: { type: 'start' | 'end'; value: Date }) => {
    const { type, value } = params;
    const timeInterval: [Date, Date] = [...timeRange];
    timeInterval[type === 'start' ? 0 : 1] = value;
    if (type === 'start' && value > timeInterval[1]) {
      const end = getDatesInitialInterval(value)[1];
      timeInterval[1] = end;
    }
    setTimeRange(timeInterval);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChange?.({ e, value: timeRange });
    setShowPopover.off();
  };

  useClickOutside({
    isActive: true,
    ignoreClicksInsideRefs: [popoverRef, buttonRef],
    handler: setShowPopover.off,
  });

  return (
    <div className={cnTimeInterval(null, [className])}>
      {label && (
        <FieldLabel className={cnTimeInterval('Label')} required size={size}>
          {label}
        </FieldLabel>
      )}
      <Button
        className={cnTimeInterval('Button')}
        label={getIntervalToString(timeRange)}
        onClick={setShowPopover.toogle}
        ref={buttonRef}
        width="full"
        view="secondary"
        size={size}
        iconRight={IconCalendar}
      />
      {showPopover && (
        <Popover
          anchorRef={buttonRef}
          ref={popoverRef}
          direction="upStartLeft"
          offset="xs"
          className={cnTimeInterval('Popover')}
          style={{
            ...style,
            zIndex: style?.zIndex ? Number(style.zIndex) + 1 : 2000,
          }}
        >
          {title && (
            <Text align="left" size="m" lineHeight="xs" weight="bold">
              {title}
            </Text>
          )}
          <div className={cnTimeInterval('Container')}>
            <DateTime
              type="date-time"
              value={timeRange[0]}
              minDate={minDate}
              className={cnTimeInterval('StartTime')}
              onChange={({ value }) => changeDate({ type: 'start', value })}
            />
            <DateTime
              type="time"
              value={timeRange[1]}
              minDate={timeRange[0]}
              maxDate={maxDate}
              className={cnTimeInterval('EndTime')}
              onChange={({ value }) => changeDate({ type: 'end', value })}
            />
          </div>
          <Button label="Готово" size="m" onClick={handleClick} />
        </Popover>
      )}
    </div>
  );
};
