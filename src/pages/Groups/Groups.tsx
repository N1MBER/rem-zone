import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { getGroups } from '../../utils/api/routes/users/users';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
// import { useFlag } from '@consta/uikit/useFlag';
import { GroupsTable } from './GroupsTable/GroupsTable';

export const Groups = () => {
  //   const [open, setOpen] = useFlag();

  return (
    <TablePage
      title="Группы"
      apiFunction={getGroups}
      tableComponent={GroupsTable}
      titleButton={
        <Button
          label="Добавить Группу"
          size="s"
          iconLeft={IconAdd}
          //   onClick={setOpen.on}
        />
      }
    />
  );
};
