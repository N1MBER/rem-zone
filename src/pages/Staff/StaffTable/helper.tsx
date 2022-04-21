import React from 'react';
import { ItemRecord, InputType } from '../../../common/CrudModal/types';
import { Staff, StaffData } from '../../../types/user';
import { Badge } from '@consta/uikit/Badge';

export const staffItem: Array<ItemRecord<Staff, InputType>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    key: 'last_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    key: 'patronomic',
    label: 'Отчество',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Почта',
    type: 'text',
    renderValue: (item) => <a href={`mailto:${item.email}`}>{item.email}</a>,
  },
  {
    key: 'username',
    label: 'Логин',
    type: 'text',
  },
  {
    key: 'position',
    label: 'Должность',
    type: 'select',
    renderValue: (item) => (
      <Badge
        size="s"
        label={item.position.description}
        status={
          item.position.name === 'master-receiver' ? 'success' : 'warning'
        }
      />
    ),
  },
];

export const staffEdit = (
  groups: string[],
  position: string[]
): Array<ItemRecord<StaffData, InputType>> => [
  {
    key: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    key: 'last_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    key: 'patronomic',
    label: 'Отчество',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    key: 'password',
    label: 'Пароль',
    type: 'text',
  },
  {
    key: 'username',
    label: 'Логин',
    type: 'text',
  },
  {
    key: 'position',
    label: 'Должность',
    type: 'select',
    list: position,
    getItemLabel: (item) => item.toString(),
    getItemKey: (item) => item.toString(),
  },
  {
    key: 'groups',
    label: 'Группы',
    type: 'select',
    multiple: true,
    list: groups,
    getItemLabel: (item) => item.toString(),
    getItemKey: (item) => item.toString(),
  },
  {
    key: 'salary',
    label: 'Ставка час',
    type: 'number',
  },
];
