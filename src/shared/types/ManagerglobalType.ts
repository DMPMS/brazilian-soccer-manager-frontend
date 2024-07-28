import { CountryType } from './CountryType';
import { TeamglobalType } from './TeamglobalType';

export interface ManagerglobalType {
  id: number;
  name: string;
  birthdate: string;
  country?: CountryType;
  teamglobal?: TeamglobalType;
}
