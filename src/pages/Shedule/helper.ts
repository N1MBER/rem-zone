import { timeTablePropColor } from '../../components/TimeTable/types';
import { generateRandomValue } from '../../utils';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Job, ViewMode } from '../../types/timetable';
import { getWeek, getMonth, resetDateTime } from '../../utils/date/date';

export const getRandomColor = () => {
  return timeTablePropColor[generateRandomValue(timeTablePropColor.length)];
};

export type CustomJob = Omit<
  Job,
  'id' | 'master' | 'status' | 'started_at' | 'ended_at'
> & {
  date: [Date, Date];
};

export const jobsCreate: Array<ItemRecord<CustomJob, InputType, boolean>> = [
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
    label: 'Стоимость услуги',
    type: 'number',
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
