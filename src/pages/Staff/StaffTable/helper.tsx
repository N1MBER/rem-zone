import React from 'react';
import { ItemRecord, InputType } from '../../../common/CrudModal/types';
import { Staff, Position, StaffData, StaffGroup } from '../../../types/user';
import { Badge } from '@consta/uikit/Badge';
import { getGroups } from '../../../utils/api/routes/users/users';
import { getPositions } from '../../../utils/api/routes/positions/positions';

export const staffItem: Array<ItemRecord<Staff, InputType, boolean>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    key: 'last_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    key: 'patronomic',
    label: 'Отчество',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Почта',
    type: 'text',
    renderValue: (item) => <a href={`mailto:${item.email}`}>{item.email}</a>,
  },
  {
    key: 'username',
    label: 'Логин',
    type: 'text',
  },
  {
    key: 'position',
    label: 'Должность',
    type: 'select',
    renderValue: (item) =>
      item.position ? (
        <Badge
          size="s"
          label={item.position.description}
          status={
            item.position.name === 'master-receiver' ? 'success' : 'warning'
          }
        />
      ) : (
        <>???</>
      ),
  },
  {
    key: 'salary',
    label: 'Ставка час',
    type: 'number',
    renderValue: (item) => <p>{Number(item.salary).toFixed(2)} ₽</p>,
  },
];

export const staffEdit: Array<
  ItemRecord<StaffData, InputType, boolean, Position | StaffGroup>
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
    key: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    key: 'username',
    label: 'Логин',
    type: 'text',
  },
  {
    key: 'position',
    label: 'Должность',
    type: 'select',
    list: [] as Position[],
    loadable: true,
    getItems: getPositions,
    queryField: 'name',
    valueKey: 'name',
    getItemLabel: (item: Position) => item.name,
    getItemKey: (item: Position) => item.id,
  },
  {
    key: 'groups',
    label: 'Группы',
    type: 'select',
    multiple: true,
    loadable: true,
    queryField: 'name',
    getItems: getGroups,
    list: [] as StaffGroup[],
    valueKey: 'name',
    getItemLabel: (item: StaffGroup) => `${item.name}`,
    getItemKey: (item: StaffGroup) => item.id,
  },
  {
    key: 'salary',
    label: 'Ставка час',
    type: 'number',
    renderValue: (item) => <p>{Number(item.salary).toFixed(2)} ₽</p>,
  },
];
