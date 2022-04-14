export type UserStatus = 'available' | 'remote' | 'out';
export type UserType = 'customer' | 'worker' | 'administrator';

export type User = {
  avatar?: string;
  userType: UserType;
  name: string;
  info: string;
  status?: UserStatus;
};

export type UserLogin = {
  pk: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};
