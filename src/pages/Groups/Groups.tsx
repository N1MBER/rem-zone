import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { addGroup, getGroups } from '../../utils/api/routes/users/users';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { GroupsTable } from './GroupsTable/GroupsTable';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { groupCreate } from './helper';
import { getErrorMessage } from '../../utils';

const cnGroups = cn('Groups');

export const Groups = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <TablePage
        className={cnGroups()}
        title="Группы"
        apiFunction={getGroups}
        tableComponent={GroupsTable}
        titleButton={
          <Button
            label="Добавить Группу"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
      />
      <CrudModal
        mode="create"
        createFunc={addGroup}
        title="Создание новой группы"
        onClose={setOpen.off}
        isOpen={open}
        items={groupCreate}
        successCallback={() => {
          toast.success('Группа успешно создана');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={(error) => {
          const message = getErrorMessage(error);
          toast.alert(message ?? 'Не удалось создать группу');
        }}
      />
    </>
  );
};

export default Groups;
