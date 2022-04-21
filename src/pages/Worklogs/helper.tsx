import React from 'react';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Worklog } from '../../types/user';

export const worklogCreate: Array<ItemRecord<Omit<Worklog, 'id'>, InputType>> =
  [
    {
      key: 'timeworked',
      label: 'Вреия работы',
      type: 'text',
    },
    {
      key: 'user',
      label: 'Сотрудник',
      type: 'text',
    },
  ];

export const worklogView: Array<ItemRecord<Worklog, InputType>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'timeworked',
    label: 'Время работы',
    type: 'text',
    renderValue: (item) => {
      const time = item.timeworked.split('.');
      return <p>{`${time[0]}:${time[1]}`}</p>;
    },
  },
  {
    key: 'user',
    label: 'Сотрудник',
    type: 'text',
  },
];
