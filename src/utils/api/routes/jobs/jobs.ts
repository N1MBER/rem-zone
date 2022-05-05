import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';
import { Job, JobStatus } from '../../../../types/timetable';

// Jobs

export const getJobs = (
  query: BaseListRequest & {
    start: string;
    end: string;
    status?: JobStatus;
    master?: string;
  }
): AxiosPromise<BaseListResponse<Job>> => {
  return instance.get(endpoints.jobs.jobs, {
    params: query,
  });
};

export const addJob = (
  data: Omit<Job, 'id' | 'master' | 'status'>
): AxiosPromise<Job> => {
  return instance.post(endpoints.jobs.jobs, { ...data });
};

export const updateJob = (
  data: Omit<Job, 'id' | 'master' | 'status'>,
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
