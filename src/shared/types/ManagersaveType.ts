import { CountryType } from './CountryType';
import { TeamsaveType } from './TeamsaveType';

export interface ManagersaveType {
  id: number;
  name: string;
  birthdate: string;
  country?: CountryType;
  teamsave?: TeamsaveType;
}
