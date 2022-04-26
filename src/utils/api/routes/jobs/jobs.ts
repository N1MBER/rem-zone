import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest } from '../../types';
import { Job } from '../../../../types/timetable';

// Jobs

export const getJobs = (query: BaseListRequest): AxiosPromise<Job[]> => {
  return instance.get(endpoints.jobs.jobs, {
    params: query,
  });
};

export const addJob = (data: Omit<Job, 'id'>): AxiosPromise<Job> => {
  return instance.post(endpoints.jobs.jobs, { ...data });
};

export const updateJob = (
  data: Omit<Job, 'id'>,
  id: string
): AxiosPromise<Job> => {
  return instance.put(`${endpoints.jobs.jobs}${id}/`, { ...data });
};

export const getJob = (id: string): AxiosPromise<Job> => {
  return instance.get(`${endpoints.jobs.jobs}${id}/`);
};

export const deleteJob = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.jobs.jobs}${id}/`);
};
