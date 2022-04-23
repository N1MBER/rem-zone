import { Worklog } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest } from '../../types';

// Worklogs

export const getWorklogs = (
  query: BaseListRequest
): AxiosPromise<Worklog[]> => {
  return instance.get(endpoints.worklog.worklog, {
    params: query,
  });
};

export const addWorklog = (
  data: Omit<Worklog, 'id'>
): AxiosPromise<Worklog> => {
  return instance.post(endpoints.worklog.worklog, { ...data });
};

export const updateWorklog = (
  data: Omit<Worklog, 'id'>,
  id: string
): AxiosPromise<Worklog> => {
  return instance.put(`${endpoints.worklog.worklog}${id}/`, { ...data });
};

export const getWorklog = (id: string): AxiosPromise<Worklog> => {
  return instance.get(`${endpoints.worklog.worklog}${id}/`);
};

export const deleteWorklog = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.worklog.worklog}${id}/`);
};
