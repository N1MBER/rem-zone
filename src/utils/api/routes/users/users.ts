import { StaffGroup, Staff, StaffData, Client } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import { BaseListRequest, BaseListResponse } from '../../types';
import { Auto } from '../../../../types/auto';

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

export const chanheStaffPassword = (
  data: { password: string },
  id: string
): AxiosPromise<{ password: string }> => {
  return instance.post(endpoints.users.changePassword(id), { ...data });
};

// Clients

export const getClients = (
  query: BaseListRequest & { newest?: boolean }
): AxiosPromise<BaseListResponse<Client>> => {
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

// Vehicle

export const getVehicles = (
  query: BaseListRequest & { newest?: boolean }
): AxiosPromise<BaseListResponse<Auto>> => {
  return instance.get(endpoints.users.auto, {
    params: query,
  });
};

export const addVehicle = (data: Omit<Auto, 'id'>): AxiosPromise<Auto> => {
  return instance.post(endpoints.users.auto, { ...data });
};

export const updateVehicle = (
  data: Omit<Auto, 'id'>,
  id: string
): AxiosPromise<Auto> => {
  return instance.put(`${endpoints.users.auto}${id}/`, { ...data });
};

export const getVehicle = (id: string): AxiosPromise<Auto> => {
  return instance.get(`${endpoints.users.auto}${id}/`);
};

export const deleteVehicle = (id: string): AxiosPromise => {
  return instance.delete(`${endpoints.users.auto}${id}/`);
};
