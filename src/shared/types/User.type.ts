import { CountryType } from './Country.type';

export interface UserType {
  id: number;
  name: string;
  birthdate: string;
  email: string;

  country?: CountryType;
}
