import React from 'react';
import { Card } from '@consta/uikit/Card';
import { cn } from '../../__private__/utils/bem';
// import { Staff as StaffType } from '../../types/user';
// import { getStaffs } from '../../utils/api/routes/users/users';
// import { useFlag } from '@consta/uikit/useFlag';

const cnStaff = cn('Staff');

export const Staff = () => {
  // const [staffList, setStaffList] = useState<StaffType[]>([]);
  // const [loading, setLoading] = useFlag(false);

  // useEffect(() => {
  //   getStaffs({ limit: 20, offset: 1 }).then((res) => {
  //     console.log(res);
  //   })
  // }, []);
  return (
    <Card className={cnStaff()} verticalSpace="2xl" horizontalSpace="2xl">
      <div />
    </Card>
  );
};
