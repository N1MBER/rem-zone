export type UserStatus = 'available' | 'remote' | 'out';
export type UserType = 'customer' | 'worker' | 'administrator';

export type User = {
  avatar?: string;
  userType: UserType;
  name: string;
  info: string;
  status?: UserStatus;
};
