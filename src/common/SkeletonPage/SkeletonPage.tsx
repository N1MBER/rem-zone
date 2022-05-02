import React from 'react';
import { Card } from '@consta/uikit/Card';
import {
  SkeletonBrick,
  SkeletonCircle,
  SkeletonText,
} from '@consta/uikit/Skeleton';
import { cn } from '../../__private__/utils/bem';

import './SkeletonPage.scss';

const cnSkeletonPage = cn('SkeletonPage');

export const SkeletonPage = () => {
  return (
    <Card
      className={cnSkeletonPage()}
      verticalSpace="2xl"
      horizontalSpace="2xl"
    >
      <div className={cnSkeletonPage('Container')}>
        <SkeletonText fontSize="xl" lineHeight="m" rows={1} />
        <div className={cnSkeletonPage('Element')}>
          <SkeletonText fontSize="xs" lineHeight="m" rows={1} />
          <SkeletonCircle size={16} />
        </div>
      </div>
      <div className={cnSkeletonPage('Container')}>
        <SkeletonBrick width="50%" height={32} />
        <SkeletonBrick width="20%" height={32} />
      </div>
      <SkeletonBrick width="100%" height={300} />
    </Card>
  );
};
