import React from 'react';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Client } from '../../types/user';
import moment from 'moment';

export const clientCreate: Array<
  ItemRecord<Omit<Client, 'id' | 'created_at'>, InputType>
> = [
  {
    key: 'last_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    key: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    key: 'patronomic',
    label: 'Отчество',
    type: 'text',
  },
  {
    key: 'phone_number',
    label: 'Номер телефона',
    type: 'text',
  },
];

export const clientView: Array<ItemRecord<Client, InputType>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'last_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    key: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    key: 'patronomic',
    label: 'Отчество',
    type: 'text',
  },
  {
    key: 'phone_number',
    label: 'Номер телефона',
    type: 'text',
    renderValue: (item) => (
      <a href={`tel:${item.phone_number}`}>{item.phone_number}</a>
    ),
  },
  {
    key: 'created_at',
    label: 'Дата регистрации',
    type: 'text',
    renderValue: (item) => (
      <>{moment(item.created_at).format('DD.MM.YYYY HH:mm')}</>
    ),
  },
];
