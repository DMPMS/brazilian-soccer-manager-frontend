import { CountryType } from './CountryType';

export interface ManagerglobalType {
  id: number;
  name: string;
  age: number;
  country?: CountryType;
}
