import { CountryType } from './CountryType';
import { PlayersavePositionType } from './PlayersavePosition';
import { TeamsaveType } from './TeamsaveType';

export interface PlayersaveType {
  id: number;
  name: string;
  birthdate: string;
  overall: number;
  stamina: number;
  playerssavePosition?: PlayersavePositionType[];
  country?: CountryType;
  teamsave?: TeamsaveType;
}
