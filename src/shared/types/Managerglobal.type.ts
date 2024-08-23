import { CountryType } from './Country.type';
import { TeamglobalType } from './Teamglobal.type';

export interface ManagerglobalType {
  id: number;
  name: string;
  birthdate: string;

  country?: CountryType;
  teamglobal?: TeamglobalType;
}
