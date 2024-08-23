import { CountryType } from './Country.type';
import { TeamsaveType } from './Teamsave.type';

export interface ManagersaveType {
  id: number;
  name: string;
  birthdate: string;

  country?: CountryType;
  teamsave?: TeamsaveType;
}
