import { Auto } from './auto';
import { UserDeprecated } from './user';

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
  executor: UserDeprecated;
  color?: ItemColor;
  customer: UserDeprecated | null;
  type: ItemType;
  startDate: Date;
  endDate: Date;
  auto?: Auto | null;
  label?: string | null;
};
