/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { autoCreate } from './helper';
import { addCar, getCars } from '../../utils/api/routes/cars/cars';
import { AutoTable } from './AutoTable/AutoTable';
import { getErrorMessage } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';

const cnAuto = cn('Auto');

type Filters = {
  name?: string;
  phone_number?: string;
  auto?: string;
  vin?: string;
};

const Auto = () => {
  const [open, setOpen] = useFlag();
  const [filterData, setFilterData] = useState<Filters>({});
  const [data, setData] = useState<Filters>({});

  const { userType } = useSelector((store: RootState) => store.user);

  const setValue: (
    key: keyof Filters,
    value: Filters[keyof Filters]
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
        className={cnAuto()}
        title="Автомобили"
        apiFunction={getCars}
        tableComponent={AutoTable}
        titleButton={
          userType !== 'master-executor' ? (
            <Button
              label="Добавить автомобиль"
              size="s"
              iconLeft={IconAdd}
              onClick={setOpen.on}
            />
          ) : undefined
        }
        additionalControls={
          <>
            <div className={cnAuto('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnAuto('Inputs')}>
                <TextField
                  className={cnAuto('Input')}
                  form="defaultClear"
                  type="text"
                  size="s"
                  value={filterData.auto}
                  onChange={({ value }) => setValue('auto', value?.toString())}
                  placeholder="Автомобиль"
                />
                <TextField
                  className={cnAuto('Input')}
                  form="brickClear"
                  type="email"
                  value={filterData.vin}
                  onChange={({ value }) => setValue('vin', value?.toString())}
                  size="s"
                  placeholder="VIN"
                />
                <TextField
                  className={cnAuto('Input')}
                  form="brickClear"
                  type="email"
                  value={filterData.name}
                  onChange={({ value }) => setValue('name', value?.toString())}
                  size="s"
                  placeholder="Владелец"
                />
                <TextField
                  className={cnAuto('Input')}
                  form="brickDefault"
                  type="email"
                  value={filterData.phone_number}
                  onChange={({ value }) =>
                    setValue('phone_number', value?.toString())
                  }
                  size="s"
                  placeholder="Номер телефона"
                />
              </div>
            </div>
            <div className={cnAuto('Buttons')}>
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
          model__brand__name: data.auto?.split(' ')[0],
          model__name: data.auto?.split(' ')[1],
          owner__phone_number: data.phone_number,
          owner__first_name: data.name?.split(' ')[1],
          owner__last_name: data.name?.split(' ')[1],
        }}
      />
      {userType !== 'master-executor' && (
        <CrudModal
          mode="create"
          createFunc={addCar}
          title="Создание нового автомобиля"
          onClose={setOpen.off}
          isOpen={open}
          items={autoCreate}
          successCallback={() => {
            toast.success('Автомобиль успешно создан');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={(error) => {
            const message = getErrorMessage(error);
            toast.alert(message ?? 'Не удалось создать автомобиль');
          }}
        />
      )}
    </>
  );
};

export default Auto;
