import React from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { Badge } from '@consta/uikit/Badge';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { Staff } from '../../../types/user';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';

type Props = {
  data: Staff[];
};

export const StaffTable = (props: Props) => {
  const { data = [] } = props;

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
      renderCell: () => (
        <div>
          <Button
            size="xs"
            title="Просмотр"
            onlyIcon
            view="secondary"
            iconLeft={IconDocFilled}
            form="defaultBrick"
          />
          <Button
            form="brick"
            size="xs"
            view="secondary"
            title="Изменить"
            onlyIcon
            iconLeft={IconEdit}
          />
          <Button
            form="brickDefault"
            size="xs"
            view="secondary"
            title="Удалить"
            onlyIcon
            iconLeft={IconTrash}
          />
        </div>
      ),
    },
  ];

  return <BaseTable columns={columns} data={data} stickyColumns={2} />;
};
