import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {
  State,
  LoginPayloadType,
  DefaultPayload,
  UpdatePayloadType,
} from './types';
import { User } from '../../../types/user';
import {
  login as loginFunc,
  changePassword as changePasswordFunc,
  getUser,
  putUser,
} from '../../../utils/api/routes/auth/auth';
import { setAuthToken } from '../../../utils/api';
import { AxiosResponse } from 'axios';
import {
  AuthData,
  ConfirmPasswordData,
} from '../../../utils/api/routes/auth/types';
import { getGroups } from '../../../utils/api/routes/users/users';
import { setGroup, setPositions } from '../settings/settings';
import { getPositions } from '../../../utils/api/routes/positions/positions';

const initialState: State = {
  isLogged: false,
  profile: undefined,
  userType: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogged: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
      state.profile = undefined;
      state.userType = undefined;
    },
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    setUserType: (state, action: PayloadAction<State['userType']>) => {
      state.userType = action.payload;
    },
  },
});

export const { setLogged, setProfile, logout, setUserType } = userSlice.actions;

export const login = createAsyncThunk<unknown, LoginPayloadType>(
  'user/login',
  async (payload, { dispatch, rejectWithValue }) => {
    const { password, username, successCallback, errorCallback, setLoading } =
      payload;
    setLoading(true);

    const userData = {
      password,
      username: username.includes('@') ? undefined : username,
      email: username.includes('@') ? username : undefined,
    } as AuthData;

    loginFunc(userData)
      .then(async (res) => {
        const accessExpireTime = 1;
        const refreshExpireTime = 3;
        ('Ошибка сервера!');
        if (res.data) {
          const { access_token, refresh_token, user } = res.data;
          Cookies.set('access', access_token, { expires: accessExpireTime });
          Cookies.set('refresh', refresh_token, {
            expires: refreshExpireTime,
          });
          setAuthToken(access_token);
          dispatch(setLogged());

          const additionalRequest = () => {
            getGroups({}).then((res) => {
              if (res.data) {
                dispatch(setGroup(res.data));
              }
            });
            getPositions({}).then((res) => {
              if (res.data) {
                dispatch(setPositions(res.data));
              }
            });
          };

          user && dispatch(setProfile(user));
          if (user) {
            if (user.is_superuser) {
              dispatch(setUserType('admin'));
              additionalRequest();
            } else if (user.groups[0].id === 1) {
              dispatch(setUserType('master-reciever'));
              additionalRequest();
            } else {
              dispatch(setUserType('master-executor'));
            }
          }

          successCallback?.(res.data.user);
        } else {
          errorCallback?.('Ошибка сервера!');
        }
      })
      .catch((err: AxiosResponse) => {
        setLoading(false);
        if (errorCallback) {
          switch (err.status) {
            case 403:
              errorCallback('Неверный логин или пароль!');
              break;
            default:
              errorCallback(err?.data?.non_field_errors ?? 'Ошибка сервера!');
              break;
          }
        }
        setLoading(false);
        return rejectWithValue(err.data);
      });
  }
);

export const getProfile = createAsyncThunk<User, DefaultPayload<User>>(
  'user/getProfile',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { successCallback } = payload;
      const response = await getUser();
      if (response?.status === 200) {
        dispatch(setProfile(response.data));
        successCallback?.(response.data);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk<unknown, UpdatePayloadType>(
  'user/updateProfile',
  async (payload, { dispatch, rejectWithValue }) => {
    const { profile, successCallback, errorCallback } = payload;
    try {
      const response = await putUser(profile);
      if (response?.status === 200) {
        dispatch(setProfile(response.data));
        successCallback && successCallback();
      }
      return response.data;
    } catch (err: any) {
      if (errorCallback) {
        if (err.data) {
          errorCallback(err.data);
        } else {
          errorCallback('Что-то пошло не так...');
        }
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk<
  unknown,
  Omit<ConfirmPasswordData, 'uid' | 'token'> & DefaultPayload<undefined>
>('user/changePassword', async (payload, { rejectWithValue }) => {
  const { new_password1, new_password2, successCallback, errorCallback } =
    payload;
  try {
    const response = await changePasswordFunc({ new_password1, new_password2 });
    if (response?.status === 204) {
      successCallback && successCallback();
    }
    return response.data;
  } catch (err: any) {
    if (errorCallback) {
      if (err.data) {
        Object.keys(err.data).forEach((key) => {
          errorCallback(`${key}: ${err.data[key][0]}`);
        });
      } else {
        errorCallback('Что-то пошло не так...');
      }
    }
    return rejectWithValue(err.response.data);
  }
});

export default userSlice.reducer;
