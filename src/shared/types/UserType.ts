import { CountryType } from './CountryType';

export interface UserType {
  id: number;
  name: string;
  birthdate: string;
  email: string;
  country?: CountryType;
}
