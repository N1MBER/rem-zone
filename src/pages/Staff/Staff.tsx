import React from 'react';
import { Card } from '@consta/uikit/Card';
import { cn } from '../../__private__/utils/bem';
import { getStaffs } from '../../utils/api/routes/users/users';
import { BaseDataTable } from '../../common/BaseComponents/BaseDataTable/BaseDataTable';
import { StaffTable } from './StaffTable/StaffTable';

import './Staff.scss';

const cnStaff = cn('Staff');

export const Staff = () => {
  return (
    <Card className={cnStaff()} verticalSpace="2xl" horizontalSpace="2xl">
      <div>
        <BaseDataTable apiFunction={getStaffs} tableComponent={StaffTable} />
      </div>
    </Card>
  );
};
