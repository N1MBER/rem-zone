import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { StaffGroup } from '../../../types/user';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteGroup as deleteGroupFunc,
  getGroup,
  updateGroup,
} from '../../../utils/api/routes/users/users';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { groupCreate, groupView } from '../helper';

import './GroupsTable.scss';

type Props = {
  data: StaffGroup[];
};

const cnGroupsTable = cn('GroupsTable');

export const GroupsTable = (props: Props) => {
  const { data = [] } = props;
  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [group, setGroup] = useState<StaffGroup | undefined>();

  const deleteGroups = (id: string) => {
    deleteGroupFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Группа успешно удалена');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<StaffGroup>> = [
    {
      title: 'ID',
      accessor: 'id',
      width: 100,
      renderCell: (row) => <b>{row.id}</b>,
    },
    {
      title: 'Название',
      accessor: 'name',
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setModalType(type);
          setGroup(row);
          setShowModal.on();
        };
        return (
          <div className={cnGroupsTable('Controls')}>
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
      <BaseTable className={cnGroupsTable()} columns={columns} data={data} />
      {modalType === 'edit' ? (
        <CrudModal
          mode="edit"
          updateFunc={updateGroup}
          items={groupCreate}
          element={{ name: group?.name ?? '' }}
          title="Изменение данных группы"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={group?.id ?? ''}
          isOpen={showModal}
          successCallback={() => {
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={() => {
            toast.alert('Ну удалось обновить данные группы');
          }}
        />
      ) : (
        <CrudModal
          mode="view"
          viewFunc={getGroup}
          items={groupView}
          title="Просмотр данных группы"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={group?.id ?? ''}
          isOpen={showModal}
        />
      )}
    </>
  );
};
