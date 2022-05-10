import { Badge } from '@consta/uikit/Badge';
import React from 'react';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Favour } from '../../types/favour';

export const favourCreate: Array<
  ItemRecord<Omit<Favour, 'id'>, InputType, boolean>
> = [
  {
    key: 'name',
    label: 'Название услуги',
    type: 'text',
  },
  {
    key: 'price',
    label: 'Стоимость',
    type: 'number',
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
];

export const favourView: Array<ItemRecord<Favour, InputType, boolean>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Название услуги',
    type: 'text',
  },
  {
    key: 'price',
    label: 'Стоимость',
    type: 'number',
    renderValue: (item) => <p>{Number(item.price).toFixed(2)} ₽</p>,
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
  {
    key: 'positions',
    label: 'Выполняют',
    type: 'text',
    renderValue: ({ positions }) =>
      positions && positions.length > 0 ? (
        <>
          {positions.map((item) => (
            <Badge size="s" label={item.name} />
          ))}
        </>
      ) : (
        'Нету'
      ),
  },
];
