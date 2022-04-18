import React from 'react';
import { BaseListRequest, BaseListResponse } from '../../../utils/api/types';
import { AxiosPromise } from 'axios';
import { cn } from '../../../__private__/utils/bem';
import { Pagination } from '../../Pagination/Pagination';

type Props<TYPE> = {
  apiFunction?: (
    params: BaseListRequest
  ) => AxiosPromise<BaseListResponse<TYPE>>;
  tableComponent: React.FC<{ data: TYPE[] }>;
  scrollClassName?: string;
};

const cnBaseDataTable = cn('BaseDataTable');

export const BaseDataTable = <TYPE,>(props: Props<TYPE>) => {
  const { apiFunction, tableComponent, scrollClassName } = props;
  return (
    <div className={cnBaseDataTable()}>
      <Pagination
        listComponent={tableComponent}
        className={scrollClassName}
        getList={apiFunction}
      />
    </div>
  );
};
