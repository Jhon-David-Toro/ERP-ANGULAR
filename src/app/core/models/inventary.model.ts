import { v7 as uuidv7 } from 'uuid';

export interface Invetary {
  id: string;
  product_id: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export const createinventaryid = (): string => {
  return uuidv7();
};
