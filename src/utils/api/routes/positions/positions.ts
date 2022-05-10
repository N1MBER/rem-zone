import { Position } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';

// Position

export const getPositions = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<Position>> => {
  return instance.get(endpoints.positions.positions, {
    params: query,
  });
};

export const addPosition = (
  data: Omit<Position, 'id'>
): AxiosPromise<Position> => {
  return instance.post(endpoints.positions.positions, { ...data });
};

export const updatePosition = (
  data: Omit<Position, 'id'>,
  id: string
): AxiosPromise<Position> => {
  return instance.put(`${endpoints.positions.positions}${id}/`, { ...data });
};

export const getPosition = (id: string): AxiosPromise<Position> => {
  return instance.get(`${endpoints.positions.positions}${id}/`);
};

export const deletePosition = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.positions.positions}${id}/`);
};
