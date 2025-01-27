import { MoraleEnum } from '../enums/Morale.enum';
import { CountryType } from './Country.type';
import { PlayersavePositionType } from './PlayersavePosition.type';
import { TeamsaveType } from './Teamsave.type';

export interface PlayersaveType {
  id: number;
  name: string;
  birthdate: string;
  overall: number;
  stamina: number;
  morale: MoraleEnum;
  playerssavePosition?: PlayersavePositionType[];

  country?: CountryType;
  teamsave?: TeamsaveType;
}
