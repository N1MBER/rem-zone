import React from 'react';
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

const cnClients = cn('Clients');

export const Clients = () => {
  const [open, setOpen] = useFlag();

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
        errorCallback={() => {
          toast.alert('Не удалось создать клиента');
        }}
      />
    </>
  );
};
