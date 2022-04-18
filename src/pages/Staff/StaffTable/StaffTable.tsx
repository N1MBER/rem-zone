import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { Badge } from '@consta/uikit/Badge';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { Staff } from '../../../types/user';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import { deleteStaff as deleteStaffFunc } from '../../../utils/api/routes/users/users';
import { toast } from '../../../utils/toast/toast';
import { useFlag } from '@consta/uikit/useFlag';
import { ModeProps, StaffModal } from '../StaffModal/StaffModal';

type Props = {
  data: Staff[];
};

export const StaffTable = (props: Props) => {
  const { data = [] } = props;
  const [modalType, setModalType] = useState<ModeProps['mode'] | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [staff, setStaff] = useState<Staff | undefined>();

  const deleteStaff = (id: string) => {
    deleteStaffFunc(id).then((res) => {
      if (res.status === 204) {
        document.location.reload();
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Staff>> = [
    {
      title: 'Ф.И.О',
      accessor: 'first_name',
      renderCell: (row) =>
        `${row.last_name} ${row.first_name[0]}.${row.patronomic[0]}.`,
    },
    {
      title: 'Email',
      accessor: 'email',
      renderCell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
    },
    {
      title: 'Логин',
      accessor: 'username',
    },
    {
      title: 'Должность',
      accessor: 'position',
      renderCell: (row) => (
        <Badge
          size="s"
          label={row.position.description}
          status={
            row.position.name === 'master-receiver' ? 'success' : 'warning'
          }
        />
      ),
    },
    {
      title: 'Ставка час',
      accessor: 'salary',
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setModalType(type);
          setStaff(row);
          setShowModal.on();
        };
        return (
          <div>
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
              onClick={() => deleteStaff(row.id)}
              iconLeft={IconTrash}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable columns={columns} data={data} stickyColumns={2} />
      {modalType === 'edit' ? (
        <StaffModal
          isOpen={showModal}
          mode={modalType}
          staff={staff ?? ({} as Staff)}
          onSubmit={() => {}}
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
        />
      ) : (
        <StaffModal
          isOpen={showModal}
          mode="view"
          id={staff?.id ?? ''}
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
        />
      )}
    </>
  );
};
