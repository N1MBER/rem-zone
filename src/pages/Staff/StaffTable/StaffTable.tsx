import React from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Staff } from '../../../types/user';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';

type Props = {
  data: Staff[];
};

export const StaffTable = (props: Props) => {
  const { data = [] } = props;

  const columns: Array<TableColumn<Staff>> = [
    {
      title: 'ID',
      accessor: 'id',
    },
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
      title: 'Должность',
      accessor: 'position',
      renderCell: (row) => row.position.description,
    },
    {
      title: 'Ставка час',
      accessor: 'salary',
    },
  ];

  return <BaseTable columns={columns} data={data} stickyColumns={2} />;
};
