import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteFavour as deleteFavourFunc,
  getFavour,
  updateFavour,
} from '../../../utils/api/routes/favour/favour';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { favourCreate, favourView } from '../helper';
import { Favour } from '../../../types/favour';

import './FavoursTable.scss';

type Props = {
  data: Favour[];
};

const cnFavoursTable = cn('FavoursTable');

const converFavour = (
  favour: Favour | undefined
): Omit<Favour, 'id'> | undefined =>
  favour
    ? {
        name: favour.name,
        price: favour.price,
        description: favour.description,
      }
    : undefined;

export const FavoursTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [favour, setFavour] = useState<Favour | undefined>();

  const deleteGroups = (id: string) => {
    deleteFavourFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Услуга успешно удалена');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Favour>> = [
    {
      title: 'ID',
      accessor: 'id',
    },
    {
      title: 'Название',
      accessor: 'name',
    },
    {
      title: 'Стоимость',
      accessor: 'price',
      renderCell: (row) => `${row.price} ₽`,
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
          setFavour(row);
          setShowModal.on();
        };
        return (
          <div className={cnFavoursTable('Controls')}>
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
      <BaseTable
        stickyColumns={2}
        className={cnFavoursTable()}
        columns={columns}
        data={data}
      />
      {modalType === 'edit' ? (
        <CrudModal
          mode="edit"
          updateFunc={updateFavour}
          items={favourCreate}
          element={converFavour(favour)}
          title="Изменение данных группы"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={favour?.id ?? ''}
          isOpen={showModal}
          successCallback={() => {
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={() => {
            toast.alert('Не удалось обновить данные услуги');
          }}
        />
      ) : (
        <CrudModal
          mode="view"
          viewFunc={getFavour}
          items={favourView}
          title="Просмотр данных услуги"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={favour?.id ?? ''}
          isOpen={showModal}
        />
      )}
    </>
  );
};
