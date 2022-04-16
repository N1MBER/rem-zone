import { Popover } from '@consta/uikit/Popover';
import React from 'react';
import { cn } from '../../__private__/utils/bem';
import { Loader } from '@consta/uikit/Loader';
import './PageLoader.scss';

const cnPageLoader = cn('PageLoader');

export const PageLoader = () => {
  return (
    <Popover className={cnPageLoader()} position={{ x: 0, y: 0 }}>
      <Loader size="m" />
    </Popover>
  );
};
