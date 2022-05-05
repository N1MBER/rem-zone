import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Brand } from '../../types/auto';

export const brandsUpdate: Array<ItemRecord<Omit<Brand, 'id'>, InputType>> = [
  {
    key: 'name',
    label: 'Наименование',
    type: 'text',
  },
];

export const brandsView: Array<ItemRecord<Brand, InputType>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Наименование',
    type: 'text',
  },
];
