import React, { useEffect, useState } from 'react';
import { Staff, Position, StaffGroup } from '../../../../types/user';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Combobox } from '@consta/uikit/Combobox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers';
import {
  setGroup,
  setPositions,
} from '../../../../store/reducers/settings/settings';
import { getPositions } from '../../../../utils/api/routes/positions/positions';
import { getGroups } from '../../../../utils/api/routes/users/users';
import { cn } from '../../../../__private__/utils/bem';

import './StaffModalControl.scss';

export type StaffData = {
  groups: string[];
  position: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  patronomic: string;
};

type StaffDataState = Omit<StaffData, 'groups' | 'position'> & {
  position: Position;
  groups: StaffGroup[];
};

type Props = {
  staff?: Staff;
  onSubmit?: (staff: StaffData) => void;
  mode: 'edit' | 'create';
  onClose?: () => void;
};

const cnStaffModalControl = cn('StaffModalControl');

export const StaffModalControl = (props: Props) => {
  const { staff, mode, onSubmit, onClose } = props;
  const [data, setData] = useState<Partial<StaffDataState>>({});

  const dispatch = useDispatch();

  const { groups, positions } = useSelector(
    (store: RootState) => store.settings
  );

  useEffect(() => {
    if (!groups) {
      getGroups({}).then((res) => {
        if (res.data) {
          dispatch(setGroup(res.data));
        }
      });
    }
    if (!positions) {
      getPositions({}).then((res) => {
        if (res.data) {
          dispatch(setPositions(res.data));
        }
      });
    }
  }, [groups, positions]);

  const convertStaffToState = (staff: Staff): StaffDataState | undefined => {
    if (staff) {
      return {
        password: staff.password,
        first_name: staff.first_name,
        last_name: staff.last_name,
        patronomic: staff.patronomic,
        email: staff.email,
        username: staff.username,
        groups: Array.isArray(staff.groups)
          ? (groups ?? []).filter(
              (item) => item.name && staff.groups.indexOf(item.name) !== -1
            )
          : [],
        position: staff.position,
      };
    }
  };

  useEffect(() => {
    const obj = staff && convertStaffToState(staff);
    obj && setData(obj);
  }, [staff]);

  const setValue = (key: keyof StaffData, value: string | null) => {
    setData({
      ...data,
      [key as string]: value ?? '',
    });
  };

  const submit = () => {
    onSubmit?.({
      ...(data as Required<StaffDataState>),
      groups:
        (data.groups
          ?.filter((item) => item.name)
          .map((item) => item.name) as string[]) ?? [],
      position: data.position?.name ?? '',
    });
  };

  return (
    <div className={cnStaffModalControl()}>
      <TextField
        label="Имя"
        placeholder="Имя"
        type="text"
        width="full"
        size="m"
        onChange={({ value }) => setValue('first_name', value)}
        value={data.first_name}
      />
      <TextField
        label="Фамилия"
        placeholder="Фамилия"
        type="text"
        size="m"
        width="full"
        onChange={({ value }) => setValue('last_name', value)}
        value={data.last_name}
      />
      <TextField
        label="Отчество"
        placeholder="Отчество"
        type="text"
        size="m"
        width="full"
        onChange={({ value }) => setValue('patronomic', value)}
        value={data.patronomic}
      />
      <TextField
        label="Логин"
        placeholder="Логин"
        type="text"
        size="m"
        width="full"
        onChange={({ value }) => setValue('username', value)}
        value={data.username}
      />
      <TextField
        label="Почта"
        placeholder="Почта"
        type="text"
        size="m"
        width="full"
        onChange={({ value }) => setValue('email', value)}
        value={data.email}
      />
      <TextField
        label="Пароль"
        placeholder="Пароль"
        type="text"
        size="m"
        width="full"
        onChange={({ value }) => setValue('password', value)}
        value={data.password}
      />
      <Combobox
        label="Должность"
        placeholder="Должность"
        items={positions ?? []}
        size="m"
        getItemLabel={(item) => item.description}
        getItemKey={(item) => item.id}
        onChange={({ value }) => value && setData({ ...data, position: value })}
        value={data.position}
        style={{ zIndex: 10000 }}
      />
      <Combobox
        label="Группы"
        size="m"
        placeholder="Группы"
        onChange={({ value }) => value && setData({ ...data, groups: value })}
        value={data.groups}
        getItemLabel={(item) => item.name ?? ''}
        getItemKey={(item) => item.id}
        items={groups ?? []}
        style={{ zIndex: 10000 }}
        multiple
      />
      <div className={cnStaffModalControl('Buttons')}>
        <Button
          label={mode === 'edit' ? 'Сохранить' : 'Создать'}
          onClick={submit}
        />
        {onClose && <Button label="Отмена" view="ghost" onClick={onClose} />}
      </div>
    </div>
  );
};
