import React from 'react';
import { SkeletonBrick, SkeletonText } from '@consta/uikit/Skeleton';
import { cn } from '../../../__private__/utils/bem';
import { Card } from '@consta/uikit/Card';

import './SkeletonCard.scss';

const cnSkeletonCard = cn('SkeletonCard');

export const SkeletonCard = () => {
  return (
    <Card
      verticalSpace="2xl"
      horizontalSpace="2xl"
      className={cnSkeletonCard()}
    >
      <SkeletonText fontSize="xl" lineHeight="m" rows={1} />
      <div className={cnSkeletonCard('Container')}>
        <SkeletonBrick width="60%" height="100%" />
        <SkeletonText rows={6} fontSize="s" lineHeight="m" />
      </div>
    </Card>
  );
};
