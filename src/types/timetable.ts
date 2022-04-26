import { User } from './user';

export type ViewMode = 'day' | 'week' | 'month';

export type Job = {
  id: string;
  master: User;
  description: string;
  started_at: string;
  ended_at: string;
  status: 'Открыта' | 'Закрыта';
  favour: number;
};
