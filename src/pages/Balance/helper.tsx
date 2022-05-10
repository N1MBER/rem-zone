import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Balance } from '../../types/bonuses';
import moment from 'moment';

export const balanceView: Array<ItemRecord<Balance, InputType, boolean>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'client',
    label: 'Клиент',
    type: 'text',
    renderValue: ({ client }) => `${client.last_name} ${client.first_name[0]}.`,
  },
  {
    key: 'updated_at',
    label: 'Последнее изменение',
    type: 'text',
    renderValue: (item) => moment(item.updated_at).format('DD.MM.YYYY HH:mm'),
  },
  {
    key: 'balance',
    label: 'Бонусы',
    type: 'text',
  },
];
