import { UserLogin, UserType } from '../../../types/user';

export type State = {
  isLogged: boolean;
  profile?: UserLogin;
  userType?: UserType;
};

export type DefaultPayload<TYPE> = {
  successCallback?: (data?: TYPE) => void;
  errorCallback?: (error: string) => void;
};

export type LoginPayloadType = {
  password: string;
  username: string;
  setLoading: (val: boolean) => void;
} & DefaultPayload<UserLogin>;

export type UpdatePayloadType = {
  profile: UserLogin;
} & DefaultPayload<undefined>;
