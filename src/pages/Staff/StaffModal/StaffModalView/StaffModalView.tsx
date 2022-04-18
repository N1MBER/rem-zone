import React, { useEffect, useState } from 'react';
import { Staff } from '../../../../types/user';
import { Text } from '@consta/uikit/Text';
import { useFlag } from '@consta/uikit/useFlag';
import { Loader } from '@consta/uikit/Loader';
import { getStaff } from '../../../../utils/api/routes/users/users';
import { Badge } from '@consta/uikit/Badge';
import { cn } from '../../../../__private__/utils/bem';

import './StaffModalView.scss';

const cnStaffModalView = cn('StaffModalView');

export const StaffModalView = (props: { id: string }) => {
  const { id } = props;
  const [staff, setStaff] = useState<Staff | undefined>();
  const [loading, setLoading] = useFlag(false);

  useEffect(() => {
    setLoading.on();
    getStaff(id)
      .then((res) => {
        setLoading.off();
        setStaff(res.data);
      })
      .catch(() => {
        setLoading.off();
      })
      .finally(() => {
        setLoading.off();
      });
  }, [id]);

  if (loading)
    return (
      <div className={cnStaffModalView()}>
        <Loader size="s" />
      </div>
    );

  return (
    <div className={cnStaffModalView()}>
      {staff ? (
        <>
          <Text size="s">
            <b>ID:</b> {staff.id}
          </Text>
          <Text size="s">
            <b>Имя:</b> {staff.first_name}
          </Text>
          <Text size="s">
            <b>Фамилия:</b> {staff.last_name}
          </Text>
          <Text size="s">
            <b>Отчество:</b> {staff.patronomic}
          </Text>
          <Text size="s">
            <b>Email:</b> <a href={`mailto:${staff.email}`}>{staff.email}</a>
          </Text>
          <Text size="s">
            <b>Логин:</b> {staff.username}
          </Text>
          <Text size="s">
            <b>Должность:</b>{' '}
            <Badge
              size="s"
              label={staff.position.description}
              status={
                staff.position.name === 'master-receiver'
                  ? 'success'
                  : 'warning'
              }
            />
          </Text>
        </>
      ) : (
        <Text>Сотрудник не найден</Text>
      )}
    </div>
  );
};
