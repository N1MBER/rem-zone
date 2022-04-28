import { ViewMode } from '../../../types/timetable';
import moment from 'moment';
import { ViewDate } from './SheduleTimeLine';
import { getWeek, getMonth } from '../../../utils/date/date';

type Result<TYPE> = {
  label: string;
  date: ViewDate<TYPE>;
};

type GetItems = <TYPE extends ViewMode>(
  mode: TYPE,
  date?: Date
) => Result<TYPE>[];

const listSize = {
  day: 30,
  week: 10,
  month: 12,
};

export const getItems: GetItems = (mode, date) => {
  const listLength = listSize[mode];
  const currentDate = date ?? new Date();

  const array: ReturnType<GetItems> = [];
  for (let index = 0; index < listLength; index++) {
    if (mode === 'day') {
      const newDate = new Date(currentDate.getTime());
      newDate.setDate(currentDate.getDate() + index);
      array.push({
        label: moment(newDate).locale('ru').format('DD MMMM'),
        date: newDate,
      });
    } else if (mode === 'month') {
      const newDate = new Date(currentDate.getTime());
      newDate.setMonth(index);
      const { startMonth, endMonth } = getMonth<true>({ date: newDate });
      array.push({
        label: `${moment(newDate).locale('ru').format('MMMM')}`,
        date: [startMonth, endMonth],
      });
    } else {
      const newDate = new Date(currentDate.getTime());
      newDate.setDate(currentDate.getDate() + index * 7);
      const { startWeek, endWeek } = getWeek<true>({ date: newDate });
      array.push({
        label: `${moment(newDate).locale('ru').format('MMMM')} ${moment(
          startWeek
        )
          .locale('ru')
          .format('DD')}-${moment(endWeek).locale('ru').format('DD')}`,
        date: [startWeek, endWeek],
      });
    }
  }
  return array;
};
