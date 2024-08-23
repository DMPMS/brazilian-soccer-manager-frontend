import { CompetitionsaveTeamsaveType } from './CompetitionsaveTeamsave.type';
import { CountryType } from './Country.type';
import { ManagersaveType } from './Managersave.type';
import { PlayersaveType } from './Playersave.type';

export interface TeamsaveType {
  id: number;
  name: string;
  srcImage: string;
  playerssaveCount: number;

  country?: CountryType;
  managersave?: ManagersaveType;
  playerssave?: PlayersaveType[];
  competitionssaveTeamsave?: CompetitionsaveTeamsaveType[];
}
