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

export function getWeek<TYPE extends boolean>(params: {
  date: Date;
  dateMode?: TYPE;
}): ResponseWeek<TYPE> {
  const { date, dateMode = true } = params;
  const startOfWeek = moment(date).startOf('isoWeek');
  const endOfWeek = moment(date).endOf('isoWeek');
  return {
    startWeek: dateMode ? startOfWeek.toDate() : startOfWeek,
    endWeek: dateMode ? endOfWeek.toDate() : endOfWeek,
  } as ResponseWeek<TYPE>;
}
