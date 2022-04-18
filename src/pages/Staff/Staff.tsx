import React, { useEffect, useState } from 'react';
import { Card } from '@consta/uikit/Card';
import { Pagination } from '@consta/uikit/Pagination';
import { cn } from '../../__private__/utils/bem';
import { getStaffs } from '../../utils/api/routes/users/users';
import { BaseDataTable } from '../../common/BaseComponents/BaseDataTable/BaseDataTable';
import { StaffTable } from './StaffTable/StaffTable';
import { StaffHeader } from './StaffHeader/StaffHeader';
import { useHistory, useLocation } from 'react-router-dom';
import { convertDataToQuery, getQueryData } from '../../utils';

import './Staff.scss';

const cnStaff = cn('Staff');

export type StaffQueries = {
  email?: string;
  name?: string;
  position?: string;
  limit?: number;
};

type FilterData = StaffQueries & { page?: number };

export const Staff = () => {
  const [filterData, setFilterData] = useState<StaffQueries>({});
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const data = getQueryData<FilterData>(search);
    if (data) {
      const { page, ...other } = data;
      setFilterData({ ...other });
      page && setPage(page);
    }
  }, []);

  useEffect(() => {
    const query = convertDataToQuery(filterData);
    history.push({
      search: query,
    });
  }, [filterData]);

  return (
    <div className={cnStaff('Container')}>
      <Card className={cnStaff()} verticalSpace="2xl" horizontalSpace="2xl">
        <StaffHeader filters={filterData} setFilters={setFilterData} />
        <div className={cnStaff('Table')}>
          <BaseDataTable
            apiFunction={getStaffs}
            tableComponent={StaffTable}
            queries={{
              name: filterData.name,
              email: filterData.email,
              position: filterData.position,
            }}
            getCount={setCount}
            limit={Number(filterData.limit ?? 20)}
            defaultPage={Number(page ?? 1)}
          />
        </div>
      </Card>
      <div />
      <Pagination
        size="m"
        className={cnStaff('Pagination')}
        position="center"
        currentPage={page ? page - 1 : 0}
        onChange={(page) => setPage(page + 1)}
        totalPages={Math.max(count / Number(filterData.limit ?? 20), 1)}
      />
    </div>
  );
};
