import React from 'react';
import { cn } from '../../../__private__/utils/bem';
import { Pagination } from '../../Pagination/Pagination';
import { ApiFunction } from '../../Pagination/types';

import './BaseDataTable.scss';

type Props<TYPE> = {
  apiFunction?: ApiFunction<TYPE>;
  tableComponent: React.FC<{ data: TYPE[] }>;
  scrollClassName?: string;
  defaultPage?: number;
  queries?: Record<string, unknown>;
  limit?: number;
  getCount?: (count: number) => void;
};

const cnBaseDataTable = cn('BaseDataTable');

export const BaseDataTable = <TYPE,>(props: Props<TYPE>) => {
  const { apiFunction, tableComponent, ...otherProps } = props;

  return (
    <div className={cnBaseDataTable()}>
      <Pagination
        listComponent={tableComponent}
        getList={apiFunction}
        {...otherProps}
      />
    </div>
  );
};
