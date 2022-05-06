import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Brand } from '../../types/auto';

export const brandsUpdate: Array<
  ItemRecord<Omit<Brand, 'id'>, InputType, boolean>
> = [
  {
    key: 'name',
    label: 'Наименование',
    type: 'text',
  },
];

export const brandsView: Array<ItemRecord<Brand, InputType, boolean>> = [
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
