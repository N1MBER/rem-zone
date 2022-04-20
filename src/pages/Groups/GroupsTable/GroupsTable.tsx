import React from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
// import { Badge } from '@consta/uikit/Badge';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { StaffGroup } from '../../../types/user';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import { deleteGroup as deleteGroupFunc } from '../../../utils/api/routes/users/users';
import { toast } from '../../../utils/toast/toast';
// import { ModeProps, StaffModal } from '../StaffModal/StaffModal';
import { cn } from '../../../__private__/utils/bem';

import './GroupsTable.scss';

type Props = {
  data: StaffGroup[];
};

const cnGroupsTable = cn('GroupsTable');

export const GroupsTable = (props: Props) => {
  const { data = [] } = props;
  //   const [modalType, setModalType] = useState<ModeProps['mode'] | undefined>();
  //   const [showModal, setShowModal] = useFlag();
  //   const [staff, setStaff] = useState<Staff | undefined>();

  const deleteGroups = (id: string) => {
    deleteGroupFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Сотрудник успешно удален');
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
        // const onClick = (type: 'edit' | 'view') => {
        //   setModalType(type);
        //   setStaff(row);
        //   setShowModal.on();
        // };
        return (
          <div className={cnGroupsTable('Controls')}>
            <Button
              size="xs"
              title="Просмотр"
              onlyIcon
              view="secondary"
              //   onClick={() => onClick('view')}
              iconLeft={IconDocFilled}
              form="defaultBrick"
            />
            <Button
              form="brick"
              size="xs"
              view="secondary"
              title="Изменить"
              onlyIcon
              //   onClick={() => onClick('edit')}
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
      {/* {modalType === 'edit' ? (
        <StaffModal
          isOpen={showModal}
          mode={modalType}
          id={staff?.id ?? ''}
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
      )} */}
    </>
  );
};
