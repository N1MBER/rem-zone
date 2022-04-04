import { ViewMode } from '../../../types/timetable';
import moment from 'moment';
import { ViewDate } from './SheduleTimeLine';
import { getWeek } from '../../../utils/date';

type Result<TYPE> = {
  label: string;
  date: ViewDate<TYPE>;
};

type GetItems = <TYPE extends ViewMode>(mode: TYPE) => Result<TYPE>[];

export const getItems: GetItems = (mode) => {
  const listLength = mode === 'day' ? 30 : 10;
  const currentDate = new Date();

  const array: ReturnType<GetItems> = [];
  for (let index = 0; index < listLength; index++) {
    if (mode === 'day') {
      const newDate = new Date(currentDate.getTime());
      newDate.setDate(currentDate.getDate() + index);
      array.push({
        label: moment(newDate).locale('ru').format('DD MMMM'),
        date: newDate,
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
