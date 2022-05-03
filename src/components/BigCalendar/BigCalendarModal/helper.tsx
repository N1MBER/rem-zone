import React from 'react';
import { BigCalendarEvent, convertStatus } from '../helper';
import { Job } from '../../../types/timetable';
import { ItemRecord, InputType } from '../../../common/CrudModal/types';
import { CustomJob } from '../../../pages/Shedule/helper';
import { Badge } from '@consta/uikit/Badge';
import moment from 'moment';

export type BigCalendarModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  item: BigCalendarEvent<Job>;
};

export const jobEdit: Array<ItemRecord<CustomJob, InputType>> = [
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
  {
    key: 'date',
    label: 'Срок выполнения',
    type: 'date-time-range',
  },
  {
    key: 'favour',
    label: 'Стоимость услуги',
    type: 'number',
  },
];

export const jobView: Array<ItemRecord<Job, InputType>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'master',
    label: 'ID',
    type: 'text',
    renderValue: ({ master }) =>
      master.last_name ? (
        <>{`${master.last_name} ${master.first_name[0]}.`}</>
      ) : (
        <>???</>
      ),
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
  {
    key: 'status',
    label: 'Статус',
    type: 'text',
    renderValue: ({ status }) => (
      <Badge label={status} size="s" status={convertStatus(status)} />
    ),
  },
  {
    key: 'started_at',
    label: 'Начало',
    type: 'text',
    renderValue: ({ started_at }) => (
      <>{moment(started_at).format('DD.MM.YYYY HH:mm')}</>
    ),
  },
  {
    key: 'ended_at',
    label: 'Завершение',
    type: 'text',
    renderValue: ({ ended_at }) => (
      <>{moment(ended_at).format('DD.MM.YYYY HH:mm')}</>
    ),
  },
  {
    key: 'favour',
    label: 'Услуги',
    type: 'number',
  },
];
