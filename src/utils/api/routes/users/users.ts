import { Group, Staff } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';

type StaffData = Omit<Staff, 'id' | 'salary'>;

// Staff

export const getStaffs = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<Staff>> => {
  return instance.get(endpoints.users.staff, {
    params: query,
  });
};

export const addStaff = (data: StaffData): AxiosPromise<Staff> => {
  return instance.post(endpoints.users.staff, { ...data });
};

export const updateStaff = (
  data: StaffData,
  id: number
): AxiosPromise<Staff> => {
  return instance.put(`${endpoints.users.staff}${id}/`, { ...data });
};

export const getStaff = (id: number): AxiosPromise<Staff> => {
  return instance.get(`${endpoints.users.staff}/${id}`);
};

export const deleteStaff = (id: number) => {
  return instance.delete(`${endpoints.users.staff}/${id}`);
};

// Groups

export const getGroups = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<Group>> => {
  return instance.get(endpoints.users.groups, {
    params: query,
  });
};

export const addGroup = (data: Omit<Group, 'id'>): AxiosPromise<Group> => {
  return instance.post(endpoints.users.staff, { ...data });
};

export const updateGroup = (
  data: Omit<Group, 'id'>,
  id: number
): AxiosPromise<Group> => {
  return instance.put(`${endpoints.users.staff}${id}/`, { ...data });
};

export const getGroup = (id: number): AxiosPromise<Group> => {
  return instance.get(`${endpoints.users.staff}/${id}`);
};

export const deleteGroup = (id: number) => {
  return instance.delete(`${endpoints.users.staff}/${id}`);
};
