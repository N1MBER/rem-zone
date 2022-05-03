import { BaseListRequest } from '../../types';
import { AnalyticWorklog, AnalyticJob } from './types';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';

export const getWorklogsAnalytic = (
  query: BaseListRequest
): AxiosPromise<AnalyticWorklog[]> => {
  return instance.get(endpoints.analytic.worklogs, {
    params: query,
  });
};

export const getJobsAnalytic = (
  query: BaseListRequest
): AxiosPromise<AnalyticJob[]> => {
  return instance.get(endpoints.analytic.jobs, {
    params: query,
  });
};
