import { v7 as uuidv7 } from 'uuid';
import { Country } from './country.model';

export type UserRole = 'admin' | 'seller';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  country: Country;
  phone_number: number;
  password: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type PublicUser = Omit<User, 'password'>;

export const createUserId = (): string => {
  return uuidv7();
};

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  first_name: string;
  last_name: string;
  email: string;
  country: Country;
  phone_number: number;
  password: string;
}
