import { Client } from './user';

export type Balance = {
  id: string;
  updated_at: string;
  balance: number;
  client: Client;
};

export type BalanceTransaction = {
  id: string;
  created_at: string;
  value: number;
  bonus_balance: string;
};
