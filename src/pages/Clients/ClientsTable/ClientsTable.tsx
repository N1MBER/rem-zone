import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { IconNodeEnd } from '@consta/uikit/IconNodeEnd';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteClient as deleteClientFunc,
  getClient,
  updateClient,
} from '../../../utils/api/routes/users/users';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { clientCreate, clientView } from '../helper';
import { Client } from '../../../types/user';
import { getErrorMessage } from '../../../utils';
import moment from 'moment';
import { getBalances } from '../../../utils/api/routes/bonuses/bonuses';
import { balanceView } from '../../Balance/helper';
import { AxiosPromise } from 'axios';
import { Balance } from '../../../types/bonuses';

import './ClientsTable.scss';

type Props = {
  data: Client[];
};

const cnClientsTable = cn('ClientsTable');

const convertClient = (
  client: Client | undefined
): Omit<Client, 'id' | 'created_at'> | undefined =>
  client
    ? {
        first_name: client.first_name,
        last_name: client.last_name,
        patronomic: client.patronomic,
        phone_number: client.phone_number,
      }
    : undefined;

export const ClientsTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<
    ModalCrudType | 'balance' | undefined
  >();
  const [showModal, setShowModal] = useFlag();
  const [client, setClient] = useState<Client | undefined>();

  const deleteClient = (id: string) => {
    deleteClientFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Клиент успешно удален');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Client>> = [
    {
      title: 'Фамилия',
      accessor: 'last_name',
    },
    {
      title: 'Имя',
      accessor: 'first_name',
    },
    {
      title: 'Отчество',
      accessor: 'patronomic',
    },
    {
      title: 'Номер телефона',
      accessor: 'phone_number',
      renderCell: (row) => (
        <a href={`tel:${row.phone_number}`}>{row.phone_number}</a>
      ),
    },
    {
      title: 'Дата регистрации',
      accessor: 'created_at',
      renderCell: (row) => moment(row.created_at).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view' | 'balance') => {
          setModalType(type);
          setClient(row);
          setShowModal.on();
        };
        return (
          <div className={cnClientsTable('Controls')}>
            <Button
              size="xs"
              title="Просмотр"
              onlyIcon
              view="secondary"
              onClick={() => onClick('view')}
              iconLeft={IconDocFilled}
              form="defaultBrick"
            />
            <Button
              form="brick"
              size="xs"
              view="secondary"
              title="Изменить"
              onlyIcon
              onClick={() => onClick('edit')}
              iconLeft={IconEdit}
            />
            <Button
              form="brick"
              size="xs"
              view="secondary"
              title="Просмотреть баланс"
              onlyIcon
              onClick={() => onClick('balance')}
              iconLeft={IconNodeEnd}
            />
            <Button
              form="brickDefault"
              size="xs"
              view="secondary"
              title="Удалить"
              onlyIcon
              onClick={() => deleteClient(row.id)}
              iconLeft={IconTrash}
            />
          </div>
        );
      },
    },
  ];

  const getBalance = async (id: string) => {
    const data = await getBalances({ limit: 1, offset: 0, client_id: id }).then(
      (res) => res.data.results[0]
    );
    return {
      data,
    } as unknown as AxiosPromise<Balance>;
  };

  return (
    <>
      <BaseTable
        stickyColumns={2}
        className={cnClientsTable()}
        columns={columns}
        data={data}
      />
      {modalType !== 'balance' && (
        <>
          {modalType === 'edit' ? (
            <CrudModal
              mode="edit"
              updateFunc={updateClient}
              items={clientCreate}
              element={convertClient(client)}
              title="Изменение данных клиента"
              onClose={() => {
                setModalType(undefined);
                setShowModal.off();
              }}
              itemId={client?.id ?? ''}
              isOpen={showModal}
              successCallback={() => {
                toast.success('Данные успешно обновились');
                setTimeout(() => document.location.reload(), 1000);
              }}
              errorCallback={(error) => {
                const message = getErrorMessage(error);
                toast.alert(message ?? 'Не удалось обновить данные клиента');
              }}
            />
          ) : (
            <CrudModal
              mode="view"
              viewFunc={getClient}
              items={clientView}
              title="Просмотр данных клиента"
              onClose={() => {
                setModalType(undefined);
                setShowModal.off();
              }}
              itemId={client?.id ?? ''}
              isOpen={showModal}
            />
          )}
        </>
      )}
      {modalType === 'balance' && (
        <CrudModal
          mode="view"
          viewFunc={getBalance}
          items={balanceView}
          title="Просмотр баланса"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={client?.id ?? ''}
          isOpen={showModal}
        />
      )}
    </>
  );
};
