import React from 'react';
import { Loader } from '@consta/uikit/Loader';
import { Table, TableColumn, TableRow, TableProps } from '@consta/uikit/Table';
import { cn } from '../../../__private__/utils/bem';
import { Text } from '@consta/uikit/Text';

const cnBaseTable = cn('BaseTable');

type AdditionalClassName<TYPE extends TableRow> = (props: {
  row: TableRow;
  column: TableColumn<TYPE>;
  isActive: boolean;
}) => string;

type Props<TYPE extends TableRow> = Omit<TableProps<TYPE>, 'rows'> & {
  data: TYPE[];
  loading?: boolean;
  columns: TableColumn<TYPE>[];
  className?: string;
  getAdditionalClassName?: AdditionalClassName<TYPE>;
};

export function BaseTable<TYPE extends TableRow>({
  data,
  columns,
  className,
  loading,
  ...props
}: Props<TYPE>) {
  return (
    <Table
      zebraStriped="even"
      columns={columns}
      className={cnBaseTable(null, [className])}
      borderBetweenColumns
      borderBetweenRows
      emptyRowsPlaceholder={
        loading ? (
          <Loader className={cnBaseTable('Loader')} size="m" />
        ) : (
          <Text>Ничего не найдено</Text>
        )
      }
      verticalAlign="center"
      rows={data}
      {...props}
    />
  );
}
