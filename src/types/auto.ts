import { Client } from './user';

export type Brand = {
  id: string;
  name: string;
};

export type CarModel = {
  id: string;
  brand: Brand;
  name: string;
};

export type Auto = {
  id: string;
  model: CarModel;
  vin: string;
  owner: Client;
  mileage: number;
  color_code: number;
  plate_number: string;
  release_date: Date;
  power: number;
  engine_size: number;
};
