import { Favour } from '../../../../types/favour';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';

// Favour

export const getFavours = (
  query: BaseListRequest & { name?: string }
): AxiosPromise<BaseListResponse<Favour>> => {
  return instance.get(endpoints.favours.favours, {
    params: query,
  });
};

export const addFavour = (data: Omit<Favour, 'id'>): AxiosPromise<Favour> => {
  return instance.post(endpoints.favours.favours, { ...data });
};

export const updateFavour = (
  data: Omit<Favour, 'id'>,
  id: string
): AxiosPromise<Favour> => {
  return instance.put(`${endpoints.favours.favours}${id}/`, { ...data });
};

export const getFavour = (id: string): AxiosPromise<Favour> => {
  return instance.get(`${endpoints.favours.favours}${id}/`);
};

export const deleteFavour = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.favours.favours}${id}/`);
};
