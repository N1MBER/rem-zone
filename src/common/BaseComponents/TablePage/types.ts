import React from 'react';
import { ApiFunction } from '../../Pagination/types';

export type TablePageProps<TYPE> = {
  title: string;
  className?: string;
  titleButton?: React.ReactElement;
  additionalControls?: React.ReactElement;
  apiFunction?: ApiFunction<TYPE>;
  tableComponent: React.FC<{ data: TYPE[] }>;
  scrollClassName?: string;
  queries?: Record<string, unknown>;
};
