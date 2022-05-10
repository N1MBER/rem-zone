export type Balance = {
  id: string;
  updated_at: string;
  balance: number;
  client: string;
};

export type BalanceTransaction = {
  id: string;
  created_at: string;
  value: number;
  bonus_balance: string;
};
