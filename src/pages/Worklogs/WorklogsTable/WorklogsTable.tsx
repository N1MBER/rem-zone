import React, { useState } from 'react';
import { Worklog, User } from '../../../types/user';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteWorklog as deleteWorklogFunc,
  getWorklog,
  updateWorklog,
} from '../../../utils/api/routes/worklogs/worklogs';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { worklogCreate, worklogView } from '../helper';
import { getErrorMessage } from '../../../utils';

type Props = {
  data: Worklog[];
};

const cnWorklogsTable = cn('WorklogsTable');

export const WorklogsTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [worklog, setWorklog] = useState<Worklog | undefined>();

  const deleteWorklog = (id: string) => {
    deleteWorklogFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Запись успешно удалена');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Worklog>> = [
    {
      title: 'Время работы',
      accessor: 'timeworked',
      renderCell: (row) => {
        const time = row.timeworked.split('.');
        return <p>{`${time[0]}:${time[1]}`}</p>;
      },
    },
    {
      title: 'Cотрудник',
      accessor: 'owner',
      renderCell: (row) => `${row.owner.last_name} ${row.owner.first_name[0]}.`,
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setModalType(type);
          setWorklog(row);
          setShowModal.on();
        };
        return (
          <div className={cnWorklogsTable('Controls')}>
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
              onClick={() => deleteWorklog(row.id)}
              iconLeft={IconTrash}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable className={cnWorklogsTable()} columns={columns} data={data} />
      {modalType === 'edit' ? (
        <CrudModal
          mode="edit"
          updateFunc={updateWorklog}
          items={worklogCreate}
          element={{
            owner: worklog?.owner ?? ({} as User),
            timeworked: worklog?.timeworked ?? '',
          }}
          title="Изменение рабочего времени"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={worklog?.id ?? ''}
          isOpen={showModal}
          successCallback={() => {
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={(error) => {
            const message = getErrorMessage(error);
            toast.alert(
              message ?? 'Не удалось обновить данные рабочего времени'
            );
          }}
        />
      ) : (
        <CrudModal
          mode="view"
          viewFunc={getWorklog}
          items={worklogView}
          title="Просмотр рабочего времени"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={worklog?.id ?? ''}
          isOpen={showModal}
        />
      )}
    </>
  );
};
