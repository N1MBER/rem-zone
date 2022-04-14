import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { RefreshResponse } from './types';

export const logout = () => {};

export const refreshToken = (
  refresh: string
): AxiosPromise<RefreshResponse> => {
  return instance.post(endpoints.auth.token_refresh, { refresh });
};
