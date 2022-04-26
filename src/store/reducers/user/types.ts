import { User, UserType } from '../../../types/user';

export type State = {
  isLogged: boolean;
  profile?: User;
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
} & DefaultPayload<User>;

export type UpdatePayloadType = {
  profile: User;
} & DefaultPayload<undefined>;
