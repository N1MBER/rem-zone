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
  plate_number: string;
  release_date: Date;
  power: number;
  engine_size: number;
};
