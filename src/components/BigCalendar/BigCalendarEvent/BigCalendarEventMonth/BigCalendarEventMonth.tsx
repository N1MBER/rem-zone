import React from 'react';
import { Job } from '../../../../types/timetable';
import { EventProps, Event } from 'react-big-calendar';
import { Text } from '@consta/uikit/Text';
import {
  cnBigCalendarEvent,
  convertStatusToColor,
} from '../../BigCalendarHeader/helper';
import { IconInfo } from '@consta/uikit/IconInfo';
import { useFlag } from '@consta/uikit/useFlag';
import { BigCalendarModal } from '../../BigCalendarModal/BigCalendarModal';
import { BigCalendarEvent } from '../../helper';

import '../BigCalendarEvent.scss';

export const BigCalendarEventMonth = (props: EventProps<Event>) => {
  const {
    event: { resource },
  } = props;
  const { description, status } = (resource ?? {}) as Job;

  const [showModal, setShowModal] = useFlag();

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
        onClick={setShowModal.on}
        style={{
          ['--event-background' as string]: convertStatusToColor(status),
        }}
        className={cnBigCalendarEvent('InfoButton')}
        type="button"
      >
        <IconInfo size="xs" />
      </button>
      <BigCalendarModal
        isOpen={showModal}
        onClose={setShowModal.off}
        item={props.event as BigCalendarEvent<Job>}
      />
    </div>
  );
};
