import React, { useState } from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { clientCreate } from './helper';
import { addClient, getClients } from '../../utils/api/routes/users/users';
import { ClientsTable } from './ClientsTable/ClientsTable';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { getErrorMessage } from '../../utils';

const cnClients = cn('Clients');

type FilterData = {
  last_name?: string;
  phone_number?: string;
};

const Clients = () => {
  const [open, setOpen] = useFlag();
  const [filterData, setFilterData] = useState<FilterData>({});
  const [data, setData] = useState<FilterData>({});

  const setValue: (
    key: keyof FilterData,
    value: FilterData[keyof FilterData]
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
        className={cnClients()}
        title="Клиенты"
        apiFunction={getClients}
        tableComponent={ClientsTable}
        titleButton={
          <Button
            label="Добавить клиента"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
        additionalControls={
          <>
            <div className={cnClients('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnClients('Inputs')}>
                <TextField
                  className={cnClients('Input')}
                  form="defaultClear"
                  type="text"
                  size="s"
                  value={filterData.last_name}
                  onChange={({ value }) =>
                    setValue('last_name', value?.toString())
                  }
                  placeholder="Фамилия"
                />
                <TextField
                  className={cnClients('Input')}
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
            <div className={cnClients('Buttons')}>
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
          last_name: data.last_name,
          phone_number: data.phone_number,
        }}
      />
      <CrudModal
        mode="create"
        createFunc={addClient}
        title="Создание нового клиента"
        onClose={setOpen.off}
        isOpen={open}
        items={clientCreate}
        successCallback={() => {
          toast.success('Клиент успешно создан');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={(error) => {
          const message = getErrorMessage(error);
          toast.alert(message ?? 'Не удалось создать клиента');
        }}
      />
    </>
  );
};

export default Clients;
