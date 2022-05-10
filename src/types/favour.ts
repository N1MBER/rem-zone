import { Position } from './user';

export type Favour = {
  id: string;
  name: string;
  description: string;
  price: number;
  positions: Position[];
};
