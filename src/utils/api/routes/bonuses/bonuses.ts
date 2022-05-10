import { Balance, BalanceTransaction } from '../../../../types/bonuses';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';

// Balance

export const getBalances = (
  query: BaseListRequest & {
    client_id?: string;
  }
): AxiosPromise<BaseListResponse<Balance>> => {
  return instance.get(endpoints.bonuses.balance, {
    params: query,
  });
};

export const getCurrentBalance = (id: string): AxiosPromise<Balance> => {
  return instance.get(`${endpoints.bonuses.balance}${id}/`);
};

export const changeBalance = (
  data: {
    bonuses: number;
  },
  id: string
): AxiosPromise<Balance> => {
  return instance.post(endpoints.bonuses.changeBalance(id), { ...data });
};

// History

export const getBalanceHistory = (
  query: BaseListRequest & {
    balance_pk?: string;
    client_id?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  }
): AxiosPromise<BaseListResponse<BalanceTransaction>> => {
  return instance.get(endpoints.bonuses.history, {
    params: query,
  });
};

export const getCurrentBalanceHistory = (
  id: string
): AxiosPromise<BalanceTransaction> => {
  return instance.get(`${endpoints.bonuses.history}${id}/`);
};
