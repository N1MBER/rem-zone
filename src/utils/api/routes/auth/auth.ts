import { UserLogin } from '../../../../types/user';
import { AxiosPromise } from 'axios';
import { instance, logoutAction } from '../..';
import { endpoints } from '../../endpoints/endpoints';
import {
  AuthData,
  ConfirmPasswordData,
  DetailResponse,
  LoginResponse,
  RefreshResponse,
  UserData,
} from './types';

// Auth

export const login = (data: AuthData): AxiosPromise<LoginResponse> => {
  return instance.post(
    endpoints.auth.login,
    { ...data },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: undefined,
      },
    }
  );
};

export const logout = (): AxiosPromise<DetailResponse> => {
  logoutAction();
  return instance.post(endpoints.auth.logout, {});
};

// Tokens

export const refreshToken = (
  refresh: string
): AxiosPromise<RefreshResponse> => {
  return instance.post(
    endpoints.auth.token_refresh,
    { refresh },
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: undefined,
      },
    }
  );
};

export const verifyToken = (token: string): AxiosPromise<unknown> => {
  return instance.post(endpoints.auth.token_verify, { token });
};

// Password

export const resetPassword = (email: string): AxiosPromise<DetailResponse> => {
  return instance.post(endpoints.auth.reset_password, { email });
};

export const confirmNewPassword = (
  data: ConfirmPasswordData
): AxiosPromise<DetailResponse> => {
  return instance.post(endpoints.auth.reset_password_confirm, { ...data });
};

export const changePassword = (
  data: Omit<ConfirmPasswordData, 'uid' | 'token'>
): AxiosPromise<DetailResponse> => {
  return instance.post(endpoints.auth.change_password, { ...data });
};

// User

export const getUser = (): AxiosPromise<UserLogin> => {
  return instance.get(endpoints.auth.user);
};

export const putUser = (data: UserData): AxiosPromise<UserLogin> => {
  return instance.put(endpoints.auth.user, { ...data });
};
export const patchUser = (data: UserData): AxiosPromise<UserLogin> => {
  return instance.patch(endpoints.auth.user, { ...data });
};
