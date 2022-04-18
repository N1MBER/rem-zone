import { Position } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest } from '../../types';

// Position

export const getPositions = (
  query: BaseListRequest
): AxiosPromise<Position[]> => {
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
  id: number
): AxiosPromise<Position> => {
  return instance.put(`${endpoints.positions.positions}${id}/`, { ...data });
};

export const getPosition = (id: number): AxiosPromise<Position> => {
  return instance.get(`${endpoints.positions.positions}/${id}`);
};

export const deletePosition = (id: number) => {
  return instance.delete(`${endpoints.positions.positions}/${id}`);
};
