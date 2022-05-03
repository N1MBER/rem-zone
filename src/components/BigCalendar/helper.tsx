import React from 'react';
import { compareDates } from '../../utils/date/date';
import { Job, JobStatus } from '../../types/timetable';
import { InputType, ItemRecord } from '../../common/CrudModal/types';
import { Badge } from '@consta/uikit/Badge';
import moment from 'moment';

export type BigCalendarEvent<TYPE> = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource: TYPE;
  resourceId?: number | string;
};

export type BigCalendarResource = {
  id: number | string;
  title: string;
};

type JobGroup = {
  items: BigCalendarEvent<Job>[];
  group: BigCalendarResource;
};

export const convertStatus = (
  status: JobStatus
): 'normal' | 'success' | 'error' | 'warning' | 'system' => {
  if (status === 'В процессе') {
    return 'warning';
  }
  if (status === 'Закрыта') {
    return 'success';
  }
  if (status === 'Открыта') {
    return 'normal';
  }
  return 'error';
};

export const convertJobToEvent = (
  item: Job,
  sortId?: number | string
): BigCalendarEvent<Job> => {
  const { started_at, ended_at, description } = item;
  const start = new Date(started_at);
  const end = new Date(ended_at);
  const allDay = !compareDates(start, end);
  return {
    id: item.id,
    title: description,
    start,
    end,
    allDay,
    resourceId: sortId,
    resource: item,
  };
};

export const getUniqueJobGroup = (items: Job[]): JobGroup[] => {
  const object: Record<
    string,
    {
      items: BigCalendarEvent<Job>[];
      title: string;
    }
  > = {};
  const array: JobGroup[] = [];
  items.forEach((item) => {
    if (item.master?.pk) {
      if (object[item.master?.pk]) {
        object[item.master?.pk].items.push(
          convertJobToEvent(item, item.master?.pk)
        );
      } else {
        object[item.master?.pk] = {
          items: [convertJobToEvent(item, item.master?.pk)],
          title: item.master?.last_name !== '' ? item.master?.last_name : '???',
        };
      }
    } else if (object.none) {
      object.none.items.push(convertJobToEvent(item, 'none'));
    } else {
      object.none = {
        items: [convertJobToEvent(item, 'none')],
        title: 'Не определены',
      };
    }
  });
  Object.keys(object).forEach((key) => {
    array.push({
      items: object[key].items,
      group: {
        id: key,
        title: object[key].title,
      },
    });
  });

  return array;
};

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
