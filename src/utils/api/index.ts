import Axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { DOMAIN } from '../constants/environment';
import { refreshToken as refreshTokenRequest } from './routes/auth/auth';

export const logoutAction = () => {
  Cookies.remove('refresh');
  Cookies.remove('access');
};

export const instance = Axios.create({
  baseURL: `${DOMAIN}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};

export const deleteAuthHeader = () => {
  delete instance.defaults.headers?.Authorization;
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === 429) {
      return error.response;
    }

    const originalRequest: typeof error.config & { _retry?: boolean } =
      error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refresh') || '';

      if (refreshToken) {
        try {
          const response = await refreshTokenRequest(refreshToken);
          const { access } = response.data;
          Cookies.set('access', access, { expires: 10 / 24 });
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return await Axios(originalRequest);
        } catch (err: unknown) {
          logoutAction();
        }
      } else {
        logoutAction();
      }
    }

    return Promise.reject(error.response);
  }
);
