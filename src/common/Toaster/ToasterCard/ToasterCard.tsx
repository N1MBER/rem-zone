import React, { CSSProperties, useEffect } from 'react';
import { Text } from '@consta/uikit/Text';
import { IconClose } from '@consta/uikit/IconClose';
import { cn } from '../../../__private__/utils/bem';
import { useFlag } from '@consta/uikit/useFlag';
import { useTimer } from '@consta/uikit/useTimer';

import './ToasterCard.scss';

type Props = {
  id: string;
  message: string;
  title?: string;
  style?: CSSProperties;
  duration?: number;
  icon?: React.ReactElement | null;
  onClose?: (id: string) => void;
};

const interval = 1000;

const cnToasterCard = cn('ToasterCard');

export const ToasterCard = (props: Props) => {
  const { message, style, duration = 5000, title, icon, id, onClose } = props;
  const [running, setRunning] = useFlag(false);

  const { time, start, pause, isRunning } = useTimer({
    endTime: 0,
    startTime: duration,
    timerType: 'DECREMENTAL',
    onTimeOver: () => onClose?.(id),
  });

  useEffect(() => {
    start();
    return pause;
  }, []);

  useEffect(() => {
    setRunning[isRunning ? 'on' : 'off']();
  }, [isRunning]);

  const progress = running
    ? ((time - interval) / duration) * 100
    : (time / duration) * 100;

  return (
    <div
      style={style}
      className={cnToasterCard()}
      onMouseEnter={pause}
      onMouseLeave={start}
    >
      {icon}
      <button
        className={cnToasterCard('Close')}
        type="button"
        onClick={() => onClose?.(id)}
      >
        <IconClose size="s" />
      </button>
      <div className={cnToasterCard('Content', { hasIcon: !!icon })}>
        {title && (
          <Text
            className={cnToasterCard('Title')}
            weight="bold"
            size="m"
            lineHeight="xs"
          >
            {title}
          </Text>
        )}
        {message && (
          <Text weight="regular" size="m" lineHeight="xs">
            {message}
          </Text>
        )}
      </div>
      <div
        className={cnToasterCard('Line', { running: isRunning })}
        style={{
          ['--toast-line-progress' as string]: `-${progress / 2}%`,
        }}
      />
    </div>
  );
};
