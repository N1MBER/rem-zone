import { User } from '../../../../types/user';

export type RefreshResponse = {
  access: string;
  refresh: string;
};

export type DetailResponse = {
  detail?: string;
};

export type ConfirmPasswordData = {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
};

export type AuthData =
  | {
      username: string;
      email?: string;
      password: string;
    }
  | {
      username?: string;
      email: string;
      password: string;
    };

export type LoginResponse = RefreshResponse & {
  access_token: string;
  refresh_token: string;
  user?: User;
};

export type UserData = {
  username: string;
  first_name: string;
  last_name: string;
};
