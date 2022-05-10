import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import { getCurrentBalance } from '../../../utils/api/routes/bonuses/bonuses';
import { cn } from '../../../__private__/utils/bem';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { balanceView } from '../helper';
import { Balance } from '../../../types/bonuses';
import moment from 'moment';
import { ModalCrudType } from '../../../types/setings';

import './BalanceTable.scss';
import { BalanceModal } from '../BalanceModal/BalanceModal';

type Props = {
  data: Balance[];
};

const cnBalanceTable = cn('BalanceTable');

export const BalanceTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [balance, setBalance] = useState<Balance | undefined>();

  const close = () => {
    setModalType(undefined);
    setShowModal.off();
  };

  const columns: Array<TableColumn<Balance>> = [
    {
      title: 'ID',
      accessor: 'id',
    },
    {
      title: 'Пользователь',
      accessor: 'client',
      renderCell: ({ client }) =>
        `${client.last_name} ${client.first_name[0]}.`,
    },
    {
      title: 'Баланс',
      accessor: 'balance',
    },
    {
      title: 'Последнее изменение',
      accessor: 'updated_at',
      renderCell: (row) => moment(row.updated_at).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setBalance(row);
          setModalType(type);
          setShowModal.on();
        };
        return (
          <div className={cnBalanceTable('Controls')}>
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
              form="brickDefault"
              size="xs"
              view="secondary"
              title="Изменить"
              onlyIcon
              onClick={() => onClick('edit')}
              iconLeft={IconEdit}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable
        stickyColumns={2}
        className={cnBalanceTable()}
        columns={columns}
        data={data}
      />
      {modalType === 'view' ? (
        <CrudModal
          mode="view"
          viewFunc={getCurrentBalance}
          items={balanceView}
          title="Просмотр баланса"
          onClose={close}
          itemId={balance?.id ?? ''}
          isOpen={showModal}
        />
      ) : (
        <BalanceModal balance={balance} isOpen={showModal} onClose={close} />
      )}
    </>
  );
};
