import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { StaffGroup } from '../../types/user';

export const groupCreate: Array<
  ItemRecord<Omit<StaffGroup, 'id'>, InputType, boolean>
> = [
  {
    key: 'name',
    label: 'Название группы',
    type: 'text',
  },
];

export const groupView: Array<ItemRecord<StaffGroup, InputType, boolean>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Название группы',
    type: 'text',
  },
];
