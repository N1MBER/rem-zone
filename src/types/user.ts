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

export type StaffGroup = {
  id: string;
  name: string | null;
};

export type Position = {
  id: number | string;
  name: string;
  rate: string;
  description: string;
};

export type Staff = {
  id: string;
  groups: string[];
  position: Position;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  patronomic: string;
  salary: string;
};

export type Group = {
  id: number;
  name: string;
};
