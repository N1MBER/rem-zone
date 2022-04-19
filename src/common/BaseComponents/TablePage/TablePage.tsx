import React, { useState } from 'react';
import { TablePageProps } from './types';
import { cn } from '../../../__private__/utils/bem';
import { Card } from '@consta/uikit/Card';
import { Pagination } from '@consta/uikit/Pagination';
import { BaseDataTable } from '../BaseDataTable/BaseDataTable';
import { TablePageHeader } from './TablePageHeader/TablePageHeader';

import './TablePage.scss';

const cnTablePage = cn('TablePage');

export const TablePage = <TYPE,>(props: TablePageProps<TYPE>) => {
  const {
    title,
    titleButton,
    additionalControls,
    className,
    apiFunction,
    tableComponent,
    scrollClassName,
    queries,
  } = props;

  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  return (
    <div className={cnTablePage('Container', [className])}>
      <Card className={cnTablePage()} verticalSpace="2xl" horizontalSpace="2xl">
        <TablePageHeader
          limit={limit}
          changeLimit={setLimit}
          title={title}
          titleButton={titleButton}
          additionalControls={additionalControls}
        />
        <div className={cnTablePage('Table')}>
          <BaseDataTable
            apiFunction={apiFunction}
            tableComponent={tableComponent}
            queries={{ ...queries }}
            scrollClassName={scrollClassName}
            getCount={setCount}
            limit={limit}
            defaultPage={page}
          />
        </div>
      </Card>
      <div />
      <Pagination
        size="m"
        className={cnTablePage('Pagination')}
        position="center"
        currentPage={page ? page - 1 : 0}
        onChange={(page) => setPage(page + 1)}
        totalPages={Math.max(count / limit, 1)}
      />
    </div>
  );
};
