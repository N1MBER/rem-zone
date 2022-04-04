import { Auto } from './auto';
import { User } from './user';

type ItemType = 'service' | 'order';

type ItemColor =
  | 'brand'
  | 'success'
  | 'alert'
  | 'warning'
  | 'caution'
  | 'normal';

export type Task = {
  key: string;
  executor: User;
  color?: ItemColor;
  customer: User | null;
  type: ItemType;
  startDate: Date;
  endDate: Date;
  auto?: Auto | null;
  label?: string | null;
};
