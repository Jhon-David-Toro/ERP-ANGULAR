import { v7 as uuidv7 } from 'uuid';

export interface Product {
  id: string;
  name_product: string;
  type_product: string;
  price: number;
  product_code: number;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const createProductId = (): string => {
  return uuidv7();
};
