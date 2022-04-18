import React, { useEffect, useState } from 'react';
import { Card } from '@consta/uikit/Card';
import { cn } from '../../__private__/utils/bem';
import { getStaffs } from '../../utils/api/routes/users/users';
import { BaseDataTable } from '../../common/BaseComponents/BaseDataTable/BaseDataTable';
import { StaffTable } from './StaffTable/StaffTable';

import './Staff.scss';
import { StaffHeader } from './StaffHeader/StaffHeader';
import { useHistory, useLocation } from 'react-router-dom';
import { convertDataToQuery, getQueryData } from '../../utils';

const cnStaff = cn('Staff');

export type StaffQueries = {
  email?: string;
  name?: string;
  position?: string;
  limit?: number;
};

type FilterData = StaffQueries & { page?: number };

export const Staff = () => {
  const [filterData, setFilterData] = useState<FilterData>({});

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => setFilterData(getQueryData(search)), []);

  useEffect(() => {
    const query = convertDataToQuery(filterData);
    history.push({
      search: query,
    });
  }, [filterData]);

  return (
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
          limit={Number(filterData.limit ?? 20)}
          defaultPage={Number(filterData.page ?? 1)}
        />
      </div>
    </Card>
  );
};
