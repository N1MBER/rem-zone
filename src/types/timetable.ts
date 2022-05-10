import { User } from './user';

export type ViewMode = 'day' | 'week' | 'month';

export type JobStatus = 'Открыта' | 'Закрыта' | 'В процессе' | 'Отложена';

export type Job = {
  id: string;
  master: User;
  description: string;
  started_at: string;
  ended_at: string;
  status: JobStatus;
  favour: number;
};

export const timeTablePropColor = [
  'brand',
  'success',
  'alert',
  'warning',
  'caution',
  'normal',
] as const;
export type TimeTablePropColor = typeof timeTablePropColor[number];
export const timeTablePropColorDefault: TimeTablePropColor =
  timeTablePropColor[0];
