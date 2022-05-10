type DayData = {
  label: string;
  start: string;
  end: string;
};

export const workTime: Record<string, DayData> = {
  mon: {
    label: 'Пн.',
    start: '9:00',
    end: '22:00',
  },
  tue: {
    label: 'Вт.',
    start: '9:00',
    end: '22:00',
  },
  wen: {
    label: 'Ср.',
    start: '9:00',
    end: '22:00',
  },
  thi: {
    label: 'Чт.',
    start: '9:00',
    end: '22:00',
  },
  fri: {
    label: 'Пт.',
    start: '9:00',
    end: '22:00',
  },
  sat: {
    label: 'Сб.',
    start: '9:00',
    end: '22:00',
  },
  sun: {
    label: 'Вс.',
    start: '9:00',
    end: '22:00',
  },
};

export const PHONE_NUMBER = '+7 (951) 670-00-06';

export const ADDRESS = 'Ленинградская обл., 188685';
