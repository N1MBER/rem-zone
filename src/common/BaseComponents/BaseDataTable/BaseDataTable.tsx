import React from 'react';
import { BaseListRequest, BaseListResponse } from '../../../utils/api/types';
import { AxiosPromise } from 'axios';
import { cn } from '../../../__private__/utils/bem';
import { Pagination } from '../../Pagination/Pagination';

import './BaseDataTable.scss';

type Props<TYPE> = {
  apiFunction?: (
    params: BaseListRequest
  ) => AxiosPromise<BaseListResponse<TYPE>>;
  tableComponent: React.FC<{ data: TYPE[] }>;
  scrollClassName?: string;
  defaultPage?: number;
  queries?: Record<string, unknown>;
  limit?: number;
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
