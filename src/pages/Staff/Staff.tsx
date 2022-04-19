import React, { useEffect, useState } from 'react';
import { useFlag } from '@consta/uikit/useFlag';
import { cn } from '../../__private__/utils/bem';
import { getStaffs } from '../../utils/api/routes/users/users';
import { StaffTable } from './StaffTable/StaffTable';
import { useHistory, useLocation } from 'react-router-dom';
import { convertDataToQuery, getQueryData } from '../../utils';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { positions } from '../../utils/constants/user';

import './Staff.scss';
import { StaffModal } from './StaffModal/StaffModal';

const cnStaff = cn('Staff');

export type StaffQueries = {
  email?: string;
  name?: string;
  position?: string;
  limit?: number;
};

type FilterData = StaffQueries & { page?: number };

export const Staff = () => {
  const [filterData, setFilterData] = useState<StaffQueries>({});
  const [data, setData] = useState<StaffQueries>({});
  const [open, setOpen] = useFlag();

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const data = getQueryData<FilterData>(search);
    if (data) {
      const { page, ...other } = data;
      setFilterData({ ...other });
    }
  }, []);

  useEffect(() => {
    const query = convertDataToQuery(filterData);
    history.push({
      search: query,
    });
  }, [filterData]);

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
                  placeholder="Ф.И.О."
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
                  getItemKey={(item) => item.type}
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
                onClick={() => setData(data)}
                iconRight={IconSearch}
              />
            </div>
          </>
        }
        queries={{
          name: filterData.name,
          email: filterData.email,
          position: filterData.position,
        }}
      />
      <StaffModal mode="create" isOpen={open} onClose={setOpen.off} />
    </>
  );
};
