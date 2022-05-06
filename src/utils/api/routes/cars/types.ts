/* eslint-disable @typescript-eslint/naming-convention */
import { Auto } from '../../../../types/auto';

export type CreateAuto = Omit<Auto, 'id' | 'model' | 'owner'> & {
  model: string;
  owner: string;
};

export type UpdateAuto = Omit<Auto, 'id' | 'model' | 'owner'>;

export type CarsParams = {
  vin?: string;
  model__brand__name?: string;
  model__name?: string;
  owner__first_name?: string;
  owner__last_name?: string;
  owner__phone_number?: string;
};

export type ModelParams = {
  brand__name?: string;
  name?: string;
};
