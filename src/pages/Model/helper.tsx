import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { CarModel } from '../../types/auto';

export const modelUpdate: Array<ItemRecord<Omit<CarModel, 'id'>, InputType>> = [
  {
    key: 'name',
    label: 'Модель',
    type: 'text',
  },
  {
    key: 'brand',
    label: 'Иарка',
    type: 'text',
  },
];

export const modelView: Array<ItemRecord<CarModel, InputType>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Модель',
    type: 'text',
  },
  {
    key: 'brand',
    label: 'Иарка',
    type: 'text',
  },
];
