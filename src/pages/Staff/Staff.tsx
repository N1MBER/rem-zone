import React, { useState } from 'react';
import { useFlag } from '@consta/uikit/useFlag';
import { cn } from '../../__private__/utils/bem';
import { addStaff, getStaffs } from '../../utils/api/routes/users/users';
import { StaffTable } from './StaffTable/StaffTable';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { staffEdit } from './StaffTable/helper';
import { toast } from '../../utils/toast/toast';

import './Staff.scss';

const cnStaff = cn('Staff');

export type StaffQueries = {
  email?: string;
  name?: string;
  position?: string;
};

export const Staff = () => {
  const [filterData, setFilterData] = useState<StaffQueries>({});
  const [data, setData] = useState<StaffQueries>({});
  const [open, setOpen] = useFlag();

  const { groups, positions } = useSelector(
    (store: RootState) => store.settings
  );

  const setValue: (
    key: keyof StaffQueries,
    value: StaffQueries[keyof StaffQueries]
  ) => void = (key, value) => {
    setFilterData({
      ...filterData,
      [key as string]: value,
    });
  };

  const clearData = () => {
    setFilterData({});
    setData({});
  };

  const items = staffEdit(
    groups.map((el) => el.name ?? ''),
    positions.map((el) => el.name ?? '')
  );

  return (
    <>
      <TablePage
        tableComponent={StaffTable}
        apiFunction={getStaffs}
        title="Сотрудники"
        titleButton={
          <Button
            label="Добавить Сотрудника"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
        additionalControls={
          <>
            <div className={cnStaff('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnStaff('Inputs')}>
                <TextField
                  className={cnStaff('Input')}
                  form="defaultClear"
                  type="text"
                  size="s"
                  value={filterData.name}
                  onChange={({ value }) => setValue('name', value?.toString())}
                  placeholder="Ф.И.О"
                />
                <TextField
                  className={cnStaff('Input')}
                  form="brick"
                  type="email"
                  value={filterData.email}
                  onChange={({ value }) => setValue('email', value?.toString())}
                  size="s"
                  placeholder="Email"
                />
                <Select
                  size="s"
                  className={cnStaff('Input')}
                  form="clearDefault"
                  placeholder="Должность"
                  items={positions}
                  value={positions.find(
                    (item) => item.name === filterData.position
                  )}
                  onChange={({ value }) => setValue('position', value?.name)}
                  getItemKey={(item) => item.id}
                  getItemLabel={(item) => item.name}
                />
              </div>
            </div>
            <div className={cnStaff('Buttons')}>
              <Button
                form="defaultBrick"
                size="s"
                view="secondary"
                label="Сброс"
                onClick={clearData}
                iconLeft={IconRevert}
              />
              <Button
                form="brickDefault"
                size="s"
                label="Поиск"
                onClick={() => setData(filterData)}
                iconRight={IconSearch}
              />
            </div>
          </>
        }
        queries={{
          last_name: data.name?.split(' ')[0],
          first_name: data.name?.split(' ')[1],
          email: data.email,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          position__name: data.position,
        }}
      />
      <CrudModal
        mode="create"
        createFunc={addStaff}
        title="Создание нового сотрудника"
        onClose={setOpen.off}
        isOpen={open}
        items={items}
        successCallback={() => {
          toast.success('Сотрудник успешно создан');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={() => {
          toast.alert('Не удалось создать сотрудника');
        }}
      />
    </>
  );
};

export default Staff;
