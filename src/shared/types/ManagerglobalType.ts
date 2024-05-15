import { CountryType } from './CountryType';
import { TeamglobalType } from './TeamglobalType';

export interface ManagerglobalType {
  id: number;
  name: string;
  age: number;
  country?: CountryType;
  teamglobal?: TeamglobalType;
}
