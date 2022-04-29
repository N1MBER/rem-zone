import React, { useMemo } from 'react';
import { Job } from '../../../../types/timetable';
import { User } from '../../../../types/user';
import { EventProps, Event } from 'react-big-calendar';
import { Text } from '@consta/uikit/Text';
import {
  cnBigCalendarEvent,
  convertStatusToColor,
} from '../../BigCalendarHeader/helper';
import { IconInfo } from '@consta/uikit/IconInfo';
import moment from 'moment';
import { compareDates } from '../../../../utils/date/date';

import '../BigCalendarEvent.scss';

export const BigCalendarEventWeek = (props: EventProps<Event>) => {
  const {
    event: { start: startProp, end: endProp, resource, allDay },
  } = props;
  const { description, master = {} as User, status } = (resource ?? {}) as Job;

  const mode = useMemo(() => {
    const start = startProp ?? new Date();
    const end = endProp ?? new Date();
    if (compareDates(start, end)) {
      const minutesStart = start?.getHours() * 60 + start?.getMinutes();
      const minutesEnd = end?.getHours() * 60 + end?.getMinutes();
      if (minutesEnd - minutesStart === 30) {
        return 'short';
      }
      if (minutesEnd - minutesStart === 90) {
        return 'medium';
      }
      return 'full';
    }
    return 'full';
  }, [startProp, endProp]);
  return (
    <div
      className={cnBigCalendarEvent({ type: 'week', mode })}
      style={{
        ['--event-background' as string]: convertStatusToColor(status),
      }}
    >
      <div className={cnBigCalendarEvent('Container')}>
        <Text size="s" lineHeight="s" weight="regular">
          {description}
        </Text>
        {mode !== 'short' && (
          <Text weight="regular" size="xs" lineHeight="s">
            Исполнитель:{' '}
            <b>
              {master.last_name
                ? `${master.last_name} ${master.first_name[0]}.`
                : '???'}
            </b>
          </Text>
        )}
        {mode === 'full' && (
          <Text weight="regular" size="xs" lineHeight="s">
            Время выполнения:{' '}
            <b>
              {`${moment(startProp).format(
                allDay ? 'DD:MM HH:mm' : 'HH:mm'
              )} - ${moment(endProp).format(allDay ? 'DD:MM HH:mm' : 'HH:mm')}`}
            </b>
          </Text>
        )}
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
