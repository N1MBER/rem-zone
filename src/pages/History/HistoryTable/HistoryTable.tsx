import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import { cn } from '../../../__private__/utils/bem';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { historyView } from '../helper';
import { getCurrentBalanceHistory } from '../../../utils/api/routes/bonuses/bonuses';
import { BalanceTransaction } from '../../../types/bonuses';
import moment from 'moment';
import { Text } from '@consta/uikit/Text';

import './HistoryTable.scss';

type Props = {
  data: BalanceTransaction[];
};

const cnHistoryTable = cn('HistoryTable');

export const HistoryTable = (props: Props) => {
  const { data = [] } = props;
  const [showModal, setShowModal] = useFlag();
  const [note, setNote] = useState<BalanceTransaction | undefined>();

  const columns: Array<TableColumn<BalanceTransaction>> = [
    {
      title: 'Дата изменения',
      accessor: 'created_at',
      renderCell: (item) => moment(item.created_at).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Количество',
      accessor: 'value',
      width: 140,
      renderCell: ({ value }) => (
        <Text size="m" view={value < 0 ? 'alert' : 'success'}>
          {value}
        </Text>
      ),
    },
    {
      title: '',
      // Необходимо из-за ошибки с ключами
      // @ts-ignore
      accessor: 'buttons',
      renderCell: (row) => {
        const onClick = () => {
          setNote(row);
          setShowModal.on();
        };
        return (
          <div className={cnHistoryTable('Controls')}>
            <Button
              size="xs"
              title="Просмотр"
              onlyIcon
              view="secondary"
              onClick={onClick}
              iconLeft={IconDocFilled}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable className={cnHistoryTable()} columns={columns} data={data} />
      <CrudModal
        mode="view"
        viewFunc={getCurrentBalanceHistory}
        items={historyView}
        title="Просмотр записи"
        onClose={setShowModal.off}
        itemId={note?.id ?? ''}
        isOpen={showModal}
      />
    </>
  );
};
