import React from 'react';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Position } from '../../types/user';

export const positionCreate: Array<
  ItemRecord<Omit<Position, 'id'>, InputType, boolean>
> = [
  {
    key: 'name',
    label: 'Название должности',
    type: 'text',
  },
  {
    key: 'rate',
    label: 'Ставка час',
    type: 'number',
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
];

export const positionView: Array<ItemRecord<Position, InputType, boolean>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Название должности',
    type: 'text',
  },
  {
    key: 'rate',
    label: 'Ставка час',
    type: 'number',
    renderValue: (item) => <p>{Number(item.rate).toFixed(2)} ₽</p>,
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
];
