import moment, { Moment } from 'moment';

export const getWeekday = (day: number) => {
  switch (day) {
    case 1:
    default:
      return 'Пн';
    case 2:
      return 'Вт';
    case 3:
      return 'Ср';
    case 4:
      return 'Чт';
    case 5:
      return 'Пт';
    case 6:
      return 'Сб';
    case 0:
      return 'Вс';
  }
};

export const compareDates = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

type ResponseWeek<TYPE> = TYPE extends false
  ? {
      startWeek: Moment;
      endWeek: Moment;
    }
  : {
      startWeek: Date;
      endWeek: Date;
    };

type ResponseMonth<TYPE> = TYPE extends false
  ? {
      startMonth: Moment;
      endMonth: Moment;
    }
  : {
      startMonth: Date;
      endMonth: Date;
    };

export const resetDateTime = (date: Date, mode?: 'start' | 'end') => {
  const copyDate = new Date(date.getTime());
  copyDate.setHours(mode === 'end' ? 23 : 0);
  copyDate.setMinutes(mode === 'end' ? 59 : 0);
  copyDate.setSeconds(mode === 'end' ? 59 : 0);
  copyDate.setMilliseconds(mode === 'end' ? 999 : 0);
  return copyDate;
};

export function getWeek<TYPE extends boolean>(params: {
  date: Date;
  dateMode?: TYPE;
}): ResponseWeek<TYPE> {
  const { date, dateMode = true } = params;
  const startOfWeek = moment(date).startOf('isoWeek');
  const endOfWeek = moment(date).endOf('isoWeek');
  return {
    startWeek: dateMode
      ? resetDateTime(startOfWeek.toDate(), 'start')
      : startOfWeek,
    endWeek: dateMode ? resetDateTime(endOfWeek.toDate(), 'end') : endOfWeek,
  } as ResponseWeek<TYPE>;
}

export function getMonth<TYPE extends boolean>(params: {
  date: Date;
  dateMode?: TYPE;
}): ResponseMonth<TYPE> {
  const { date, dateMode = true } = params;
  const startOfMonth = moment(date).startOf('month');
  const endOfMonth = moment(date).endOf('month');
  return {
    startMonth: dateMode
      ? resetDateTime(startOfMonth.toDate(), 'start')
      : startOfMonth,
    endMonth: dateMode ? resetDateTime(endOfMonth.toDate(), 'end') : endOfMonth,
  } as ResponseMonth<TYPE>;
}
