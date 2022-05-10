import { timeTablePropColor } from '../../components/TimeTable/types';
import { generateRandomValue } from '../../utils';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Job, ViewMode } from '../../types/timetable';
import { getWeek, getMonth, resetDateTime } from '../../utils/date/date';
import { getFavours } from '../../utils/api/routes/favour/favour';
import { Favour } from '../../types/favour';
import { Staff } from '../../types/user';
import { getStaffs } from '../../utils/api/routes/users/users';

export const getRandomColor = () => {
  return timeTablePropColor[generateRandomValue(timeTablePropColor.length)];
};

export type CustomJob = Omit<
  Job,
  'id' | 'master' | 'status' | 'started_at' | 'ended_at'
> & {
  date: [Date, Date];
  master: string;
};

export const jobsCreate: Array<
  ItemRecord<CustomJob, InputType, boolean, Favour | Staff>
> = [
  {
    key: 'master',
    label: 'Исполнитель',
    type: 'select',
    list: [] as Staff[],
    getItems: getStaffs,
    loadable: true,
    queryField: 'name',
    getItemLabel: (item: Staff) => `${item.last_name} ${item.first_name[0]}.`,
    getItemKey: (item: Staff) => item.id,
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'text',
  },
  {
    key: 'date',
    label: 'Срок выполнения',
    type: 'date-time-range',
  },
  {
    key: 'favour',
    label: 'Услуга',
    type: 'select',
    list: [] as Favour[],
    getItems: getFavours,
    loadable: true,
    queryField: 'name',
    getItemLabel: (item: Favour) => item.name,
    getItemKey: (item: Favour) => item.id,
  },
];

export const getStartDate = (mode: ViewMode, date?: Date): [Date, Date] => {
  const targetDate = date ?? new Date();
  if (mode === 'week') {
    const { startWeek, endWeek } = getWeek<true>({ date: targetDate });
    return [resetDateTime(startWeek), resetDateTime(endWeek, 'end')];
  }
  if (mode === 'month') {
    const { startMonth, endMonth } = getMonth<true>({ date: targetDate });
    return [resetDateTime(startMonth), resetDateTime(endMonth, 'end')];
  }
  return [resetDateTime(targetDate), resetDateTime(targetDate, 'end')];
};
