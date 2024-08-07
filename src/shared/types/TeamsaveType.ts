import { CompetitionsaveTeamsaveType } from './CompetitionsaveTeamsave';
import { CountryType } from './CountryType';
import { ManagersaveType } from './ManagersaveType';
import { PlayersaveType } from './PlayersaveType';

export interface TeamsaveType {
  id: number;
  name: string;
  srcImage: string;
  country?: CountryType;
  managersave?: ManagersaveType;
  playerssave?: PlayersaveType[];
  playerssaveCount: number;
  competitionssaveTeamsave?: CompetitionsaveTeamsaveType[];
}
