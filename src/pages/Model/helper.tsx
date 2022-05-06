import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { CarModel } from '../../types/auto';

export const modelUpdate: Array<
  ItemRecord<Omit<CarModel, 'id'>, InputType, boolean>
> = [
  {
    key: 'name',
    label: 'Модель',
    type: 'text',
  },
  {
    key: 'brand',
    label: 'Марка',
    type: 'text',
  },
];

export const modelView: Array<ItemRecord<CarModel, InputType, boolean>> = [
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
    label: 'Марка',
    type: 'text',
  },
];
