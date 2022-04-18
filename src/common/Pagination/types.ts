import React from 'react';
import { AxiosError, AxiosPromise } from 'axios';
import { BaseListRequest, BaseListResponse } from '../../utils/api/types';
import { PropsWithHTMLAttributes } from '../../__private__/utils/types/PropsWithHTMLAttributes';

type ComponentProps<TYPE, K> = PropsWithHTMLAttributes<
  {
    data: TYPE[];
  } & K,
  HTMLDivElement
>;

export type PaginationState<TYPE> = { count: number; data: TYPE[] };

export interface PaginationProps<TYPE, U, Q, K> {
  getList?: (
    params: BaseListRequest & U
  ) => AxiosPromise<BaseListResponse<TYPE>>;
  listComponent: React.FC<ComponentProps<TYPE, K>>;
  queries?: Omit<U, keyof BaseListRequest> extends Q ? Q : never;
  listProps?: K;
  limit?: number;
  onStartCallback?: () => void;
  successCallback?: (data: TYPE[]) => void;
  errorCallback?: (err?: AxiosError) => void;
  className?: string;
  rerenderAfterActionTrigger?: string | number | boolean;
}

export type PaginationViewProps<TYPE, Q, U, K> = Pick<
  PaginationProps<TYPE, Q, U, K>,
  'listProps' | 'listComponent'
> &
  PaginationState<TYPE> & {
    page: number;
    limit: number;
    setPage: (value: React.SetStateAction<number>) => void;
    className?: string;
  };
