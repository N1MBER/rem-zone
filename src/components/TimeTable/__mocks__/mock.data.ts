import { Auto } from '../../../types/auto';
import { User } from '../../../types/user';
import { TimeTableDefaultItem } from '../types';

export const executor: User = {
  userType: 'worker',
  name: 'Иванов',
  info: '',
};
export const customer: User = {
  userType: 'customer',
  name: 'Владимир',
  info: '',
};
export const auto: Auto = {
  brand: 'Toyota',
  id: '1',
  VIN: '12312313',
};

const startDate = new Date('2022-03-11T10:00:00');
startDate.setDate(new Date().getDate());
startDate.setMonth(new Date().getMonth());
const endDate = new Date(startDate);
endDate.setHours(11);

export const timeTableItems: TimeTableDefaultItem[] = [
  {
    key: '1',
    executor,
    customer,
    auto,
    type: 'service',
    color: 'success',
    startDate,
    endDate,
  },
];
