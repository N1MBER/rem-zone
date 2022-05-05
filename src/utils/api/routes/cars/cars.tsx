import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';
import { Auto } from '../../../../types/auto';
import { CreateAuto, UpdateAuto } from './types';

// Car

export const getCars = (
  query: BaseListRequest & { newest?: boolean }
): AxiosPromise<BaseListResponse<Auto>> => {
  return instance.get(endpoints.cars.cars, {
    params: query,
  });
};

export const addCar = (data: CreateAuto): AxiosPromise<Auto> => {
  return instance.post(endpoints.cars.cars, { ...data });
};

export const updateCar = (data: UpdateAuto, id: string): AxiosPromise<Auto> => {
  return instance.put(`${endpoints.cars.cars}${id}/`, { ...data });
};

export const getCar = (id: string): AxiosPromise<Auto> => {
  return instance.get(`${endpoints.cars.cars}${id}/`);
};

export const deleteCar = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.cars.cars}${id}/`);
};
