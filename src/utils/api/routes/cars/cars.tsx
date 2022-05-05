import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';
import { Auto, Brand, CarModel } from '../../../../types/auto';
import { CreateAuto, UpdateAuto } from './types';

// Car

export const getCars = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<Auto>> => {
  return instance.get(endpoints.cars.cars, {
    params: query,
  });
};

export const addCar = (data: CreateAuto): AxiosPromise<CreateAuto> => {
  return instance.post(endpoints.cars.cars, { ...data });
};

export const updateCar = (
  data: UpdateAuto,
  id: string
): AxiosPromise<UpdateAuto> => {
  return instance.put(`${endpoints.cars.cars}${id}/`, { ...data });
};

export const getCar = (id: string): AxiosPromise<Auto> => {
  return instance.get(`${endpoints.cars.cars}${id}/`);
};

export const deleteCar = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.cars.cars}${id}/`);
};

// Brands

export const getBrands = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<Brand>> => {
  return instance.get(endpoints.cars.brand, {
    params: query,
  });
};

export const addBrand = (data: Omit<Brand, 'id'>): AxiosPromise<Brand> => {
  return instance.post(endpoints.cars.brand, { ...data });
};

export const updateBrand = (
  data: Omit<Brand, 'id'>,
  id: string
): AxiosPromise<Brand> => {
  return instance.put(`${endpoints.cars.brand}${id}/`, { ...data });
};

export const getBrand = (id: string): AxiosPromise<Brand> => {
  return instance.get(`${endpoints.cars.brand}${id}/`);
};

export const deleteBrand = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.cars.brand}${id}/`);
};

// Models

export const getModels = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<CarModel>> => {
  return instance.get(endpoints.cars.model, {
    params: query,
  });
};

export const addModel = (
  data: Omit<CarModel, 'id'>
): AxiosPromise<CarModel> => {
  return instance.post(endpoints.cars.model, { ...data });
};

export const updateModel = (
  data: Omit<CarModel, 'id'>,
  id: string
): AxiosPromise<CarModel> => {
  return instance.put(`${endpoints.cars.model}${id}/`, { ...data });
};

export const getModel = (id: string): AxiosPromise<CarModel> => {
  return instance.get(`${endpoints.cars.model}${id}/`);
};

export const deleteModel = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.cars.model}${id}/`);
};
