import React from 'react';
import { Card } from '@consta/uikit/Card';
import { cn } from '../../__private__/utils/bem';

const cnStaff = cn('Staff');

export const Staff = () => {
  return (
    <Card className={cnStaff()} verticalSpace="2xl" horizontalSpace="2xl">
      <div />
    </Card>
  );
};
