import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { Badge } from '@consta/uikit/Badge';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconLock } from '@consta/uikit/IconLock';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { Staff, StaffData } from '../../../types/user';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteStaff as deleteStaffFunc,
  getStaff,
  updateStaff,
  chanheStaffPassword,
} from '../../../utils/api/routes/users/users';
import { toast } from '../../../utils/toast/toast';
import { useFlag } from '@consta/uikit/useFlag';
import { cn } from '../../../__private__/utils/bem';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { staffEdit, staffItem } from './helper';
import { ModalCrudType } from '../../../types/setings';
import { getErrorMessage } from '../../../utils';

import './StaffTable.scss';

type Props = {
  data: Staff[];
};

const cnStaffTable = cn('StaffTable');

export const StaffTable = (props: Props) => {
  const { data = [] } = props;
  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [staff, setStaff] = useState<Staff | undefined>();
  const [showChangePassword, setShowChangePassword] = useFlag();

  const deleteStaff = (id: string) => {
    deleteStaffFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Сотрудник успешно удален');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const convertStaffToData = (
    staff: Staff | undefined
  ): StaffData | undefined => {
    if (staff) {
      return {
        password: staff.password,
        first_name: staff.first_name,
        last_name: staff.last_name,
        patronomic: staff.patronomic,
        email: staff.email,
        username: staff.username,
        groups: Array.isArray(staff.groups) ? staff.groups : [],
        position: staff.position.name,
      };
    }
  };

  const columns: Array<TableColumn<Staff>> = [
    {
      title: 'Ф.И.О',
      accessor: 'first_name',
      width: 150,
      renderCell: (row) =>
        row.last_name
          ? `${row.last_name} ${row.first_name?.[0]}.${row.patronomic?.[0]}.`
          : '???',
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
      renderCell: (row) => {
        let status: 'error' | 'success' | 'warning' =
          row.position?.name === 'master-receiver' ? 'success' : 'warning';
        if (!row.position) {
          status = 'error';
        }
        return (
          <Badge
            size="s"
            label={row.position?.name ?? 'Не определена'}
            status={status}
          />
        );
      },
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
          <div className={cnStaffTable('Controls')}>
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
              onlyIcon
              iconLeft={IconLock}
              title="Изменить пароль"
              onClick={() => {
                setStaff(row);
                setShowChangePassword.on();
              }}
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
      <BaseTable
        className={cnStaffTable()}
        columns={columns}
        data={data}
        stickyColumns={2}
      />
      {modalType === 'edit' ? (
        <CrudModal
          mode="edit"
          updateFunc={updateStaff}
          items={staffEdit}
          element={convertStaffToData(staff)}
          title="Изменение данных сотрудника"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={staff?.id ?? ''}
          isOpen={showModal}
          successCallback={() => {
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={(error) => {
            const message = getErrorMessage(error);
            toast.alert(message ?? 'Не удалось обновить данные сотрудника');
          }}
        />
      ) : (
        <CrudModal
          mode="view"
          viewFunc={getStaff}
          items={staffItem}
          title="Просмотр данных сотрудника"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={staff?.id ?? ''}
          isOpen={showModal}
        />
      )}
      <CrudModal
        mode="edit"
        updateFunc={chanheStaffPassword}
        items={[
          {
            key: 'password',
            type: 'text',
            label: 'Новый пароль',
          },
        ]}
        element={{
          password: '',
        }}
        title="Изменение пароля сотрудника"
        onClose={setShowChangePassword.off}
        itemId={staff?.id ?? ''}
        isOpen={showChangePassword}
        successCallback={() => {
          toast.success('Пароль успешно обновлен');
        }}
        errorCallback={() => {
          toast.alert('Не удалось обновить пароль');
        }}
      />
    </>
  );
};
