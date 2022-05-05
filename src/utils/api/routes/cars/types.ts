import { Auto } from '../../../../types/auto';

export type CreateAuto = Omit<Auto, 'id' | 'model' | 'owner'> & {
  model: string;
  owner: string;
};

export type UpdateAuto = Omit<Auto, 'id' | 'model' | 'owner'>;
