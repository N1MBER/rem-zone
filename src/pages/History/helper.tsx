import React from 'react';
import { BalanceTransaction } from '../../types/bonuses';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import moment from 'moment';
import { Text } from '@consta/uikit/Text';

export const historyView: Array<
  ItemRecord<BalanceTransaction, InputType, boolean>
> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'created_at',
    label: 'Дата изменения',
    type: 'text',
    renderValue: (item) => moment(item.created_at).format('DD.MM.YYYY HH:mm'),
  },
  {
    key: 'value',
    label: 'Количество',
    type: 'text',
    renderValue: ({ value }) => (
      <Text size="m" view={value < 0 ? 'alert' : 'success'}>
        {`${value < 0 ? '- ' : ''} ${value}`}
      </Text>
    ),
  },
];
