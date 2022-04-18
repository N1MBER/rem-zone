import React, { useEffect, useState } from 'react';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { positions } from '../../../utils/constants/user';
import { limits } from '../../../utils';
import { cn } from '../../../__private__/utils/bem';

import './StaffHeader.scss';
import { StaffQueries } from '../Staff';
import { useFlag } from '@consta/uikit/useFlag';
import { StaffModal } from '../StaffModal/StaffModal';

const cnStaffHeader = cn('StaffHeader');

type Props = {
  filters?: StaffQueries;
  setFilters?: (data: StaffQueries) => void;
};

export const StaffHeader = (props: Props) => {
  const { filters, setFilters } = props;

  const [open, setOpen] = useFlag();

  const [data, setData] = useState<StaffQueries>({});

  useEffect(() => {
    filters && setData(filters);
  }, [filters]);

  const setValue: (
    key: keyof StaffQueries,
    value: StaffQueries[keyof StaffQueries]
  ) => void = (key, value) => {
    setData({
      ...data,
      [key as string]: value,
    });
  };

  const clearData = () => {
    setFilters?.({});
    setData({});
  };

  return (
    <>
      <div className={cnStaffHeader()}>
        <div className={cnStaffHeader('Top')}>
          <Text size="3xl" lineHeight="m" view="primary" weight="bold">
            Сотрудники
          </Text>
          <Button
            label="Добавить Сотрудника"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        </div>
        <div className={cnStaffHeader('Bottom')}>
          <div className={cnStaffHeader('Controls')}>
            <Text size="s" lineHeight="m" view="primary" weight="regular">
              Поиск
            </Text>
            <div className={cnStaffHeader('Inputs')}>
              <TextField
                className={cnStaffHeader('Input')}
                form="defaultClear"
                type="text"
                size="s"
                value={data.name}
                onChange={({ value }) => setValue('name', value?.toString())}
                placeholder="Ф.И.О."
              />
              <TextField
                className={cnStaffHeader('Input')}
                form="brick"
                type="email"
                value={data.email}
                onChange={({ value }) => setValue('email', value?.toString())}
                size="s"
                placeholder="Email"
              />
              <Select
                size="s"
                className={cnStaffHeader('Input')}
                form="clearDefault"
                placeholder="Должность"
                items={positions}
                value={positions.find((item) => item.name === data.position)}
                onChange={({ value }) => setValue('position', value?.name)}
                getItemKey={(item) => item.type}
                getItemLabel={(item) => item.name}
              />
            </div>
          </div>
          <div className={cnStaffHeader('Buttons')}>
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
              onClick={() => setFilters?.(data)}
              iconRight={IconSearch}
            />
          </div>
          <Select
            size="s"
            className={cnStaffHeader('Select')}
            placeholder="Количество"
            items={limits}
            value={data.limit}
            onChange={({ value }) => value && setValue('limit', value)}
            getItemKey={(item) => item}
            getItemLabel={(item) => item.toString()}
          />
        </div>
      </div>
      <StaffModal mode="create" isOpen={open} onClose={setOpen.off} />
    </>
  );
};
