import React from 'react';
import { Job } from '../../../../types/timetable';
import { EventProps, Event } from 'react-big-calendar';
import { Text } from '@consta/uikit/Text';
import {
  cnBigCalendarEvent,
  convertStatusToColor,
} from '../../BigCalendarHeader/helper';
import { IconInfo } from '@consta/uikit/IconInfo';

import '../BigCalendarEvent.scss';

export const BigCalendarEventMonth = (props: EventProps<Event>) => {
  const {
    event: { resource },
  } = props;
  const { description, status } = (resource ?? {}) as Job;

  return (
    <div
      className={cnBigCalendarEvent({ type: 'month', mode: 'short' })}
      style={{
        ['--event-background' as string]: convertStatusToColor(status),
      }}
    >
      <div className={cnBigCalendarEvent('Container')}>
        <Text size="s" lineHeight="s" weight="regular">
          {description}
        </Text>
      </div>
      <button
        style={{
          ['--event-background' as string]: convertStatusToColor(status),
        }}
        className={cnBigCalendarEvent('InfoButton')}
        type="button"
      >
        <IconInfo size="xs" />
      </button>
    </div>
  );
};
