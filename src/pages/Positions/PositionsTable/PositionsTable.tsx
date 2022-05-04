import React, { useState } from 'react';
import { Position } from '../../../types/user';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deletePosition as deletePositionFunc,
  getPosition,
  updatePosition,
} from '../../../utils/api/routes/positions/positions';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { positionCreate, positionView } from '../helper';

import './PositionsTable.scss';

type Props = {
  data: Position[];
};

const cnPositionsTable = cn('PositionsTable');

const converPosition = (
  position: Position | undefined
): Omit<Position, 'id'> | undefined =>
  position
    ? {
        name: position.name,
        rate: position.rate,
        description: position.description,
      }
    : undefined;

export const PositionsTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [position, setPosition] = useState<Position | undefined>();

  const deleteGroups = (id: string) => {
    deletePositionFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Должность успешно удалена');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Position>> = [
    {
      title: 'Название',
      accessor: 'name',
    },
    {
      title: 'Ставка  час',
      accessor: 'rate',
      renderCell: (row) => `${row.rate} ₽`,
    },
    {
      title: 'Описание',
      accessor: 'description',
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setModalType(type);
          setPosition(row);
          setShowModal.on();
        };
        return (
          <div className={cnPositionsTable('Controls')}>
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
              form="brickDefault"
              size="xs"
              view="secondary"
              title="Удалить"
              onlyIcon
              onClick={() => deleteGroups(row.id)}
              iconLeft={IconTrash}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable className={cnPositionsTable()} columns={columns} data={data} />
      {modalType === 'edit' ? (
        <CrudModal
          mode="edit"
          updateFunc={updatePosition}
          items={positionCreate}
          element={converPosition(position)}
          title="Изменение данных группы"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={position?.id ?? ''}
          isOpen={showModal}
          successCallback={() => {
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={() => {
            toast.alert('Не удалось обновить данные должности');
          }}
        />
      ) : (
        <CrudModal
          mode="view"
          viewFunc={getPosition}
          items={positionView}
          title="Просмотр данных должности"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={position?.id ?? ''}
          isOpen={showModal}
        />
      )}
    </>
  );
};
