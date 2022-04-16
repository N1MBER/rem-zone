import { UserLogin } from '../../../types/user';

export type State = {
  isLogged: boolean;
  profile?: UserLogin;
};

export type DefaultPayload<TYPE> = {
  successCallback?: (data?: TYPE) => void;
  errorCallback?: (error: string) => void;
};

export type LoginPayloadType = {
  password: string;
  username: string;
  setLoading: (val: boolean) => void;
} & DefaultPayload<undefined>;

export type UpdatePayloadType = {
  profile: UserLogin;
} & DefaultPayload<undefined>;
