import { StaffGroup, Staff, StaffData, Client } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';

// Staff

export const getStaffs = (
  query: BaseListRequest
): AxiosPromise<BaseListResponse<Staff>> => {
  return instance.get(endpoints.users.staff, {
    params: query,
  });
};

export const addStaff = (data: StaffData): AxiosPromise<StaffData> => {
  return instance.post(endpoints.users.staff, { ...data });
};

export const updateStaff = (
  data: StaffData,
  id: string
): AxiosPromise<StaffData> => {
  return instance.put(`${endpoints.users.staff}${id}/`, { ...data });
};

export const getStaff = (id: string): AxiosPromise<Staff> => {
  return instance.get(`${endpoints.users.staff}${id}/`);
};

export const deleteStaff = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.users.staff}${id}/`);
};

// Groups

export const getGroups = (
  query: BaseListRequest
): AxiosPromise<StaffGroup[]> => {
  return instance.get(endpoints.users.groups, {
    params: query,
  });
};

export const addGroup = (
  data: Omit<StaffGroup, 'id'>
): AxiosPromise<StaffGroup> => {
  return instance.post(endpoints.users.groups, { ...data });
};

export const updateGroup = (
  data: Omit<StaffGroup, 'id'>,
  id: string
): AxiosPromise<StaffGroup> => {
  return instance.put(`${endpoints.users.groups}${id}/`, { ...data });
};

export const getGroup = (id: string): AxiosPromise<StaffGroup> => {
  return instance.get(`${endpoints.users.groups}${id}/`);
};

export const deleteGroup = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.users.groups}${id}/`);
};

// Clients

export const getClients = (query: BaseListRequest): AxiosPromise<Client[]> => {
  return instance.get(endpoints.users.clients, {
    params: query,
  });
};

export const addClient = (
  data: Omit<Client, 'id' | 'created_at'>
): AxiosPromise<Client> => {
  return instance.post(endpoints.users.clients, { ...data });
};

export const updateClient = (
  data: Omit<Client, 'id' | 'created_at'>,
  id: string
): AxiosPromise<Client> => {
  return instance.put(`${endpoints.users.clients}${id}/`, { ...data });
};

export const getClient = (id: string): AxiosPromise<Client> => {
  return instance.get(`${endpoints.users.clients}${id}/`);
};

export const deleteClient = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.users.clients}${id}/`);
};
