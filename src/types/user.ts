export type UserStatus = 'available' | 'remote' | 'out';
export type UserType = 'master-executor' | 'master-reciever' | 'admin';

export type UserDeprecated = {
  avatar?: string;
  userType: UserType;
  name: string;
  info: string;
  status?: UserStatus;
};

export type StaffGroup = {
  id: string;
  name: string | null;
};

export type Group = {
  id: number;
  name: string;
};

export type User = {
  pk: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser?: boolean;
  groups: Group[];
};

export type Position = {
  id: string;
  name: string;
  rate: number;
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

export type StaffData = {
  groups: string[];
  position: string;
  password: string;
  username: string;
  salary: number;
  first_name: string;
  last_name: string;
  email: string;
  patronomic: string;
};

export type Worklog = {
  id: string;
  timeworked: string;
  user: string;
};

export type Client = {
  id: string;
  first_name: string;
  last_name: string;
  patronomic: string;
  phone_number: string;
  created_at: string;
};
