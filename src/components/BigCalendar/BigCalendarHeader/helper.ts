import { cn } from '../../../__private__/utils/bem';
import { JobStatus } from '../../../types/timetable';

export const cnBigCalendarEvent = cn('BigCalendarEvent');

export const convertStatusToColor = (status: JobStatus): string => {
  if (status === 'В процессе') {
    return 'var(--color-bg-warning)';
  }
  if (status === 'Закрыта') {
    return 'var(--color-bg-success)';
  }
  if (status === 'Открыта') {
    return 'var(--color-bg-alert)';
  }
  return 'var(--color-bg-caution)';
};
