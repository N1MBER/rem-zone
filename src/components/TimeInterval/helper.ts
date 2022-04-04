import moment from 'moment';

export const getIntervalToString = (dates: [Date, Date]) =>
  `${moment(dates[0]).format('DD.MM.YYYY')} / ${moment(dates[0]).format(
    'HH:mm'
  )} - ${moment(dates[1]).format('HH:mm')}`;

export const getCurrnetDate = (currentDate?: Date): Date => {
  const date = currentDate ?? new Date();
  date.setSeconds(0);
  if (date.getMinutes() > 0) {
    date.setMinutes(0);
    date.setHours(date.getHours() + 1);
    return date;
  }
  return date;
};

export const getDatesInitialInterval = (date: Date) => {
  const secondDate = new Date(date);
  secondDate.setHours(date.getHours() + 1);
  return [date, secondDate];
};
