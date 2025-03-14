import { RuleEnum } from '../enums/Rule.enum';
import { CountryType } from './Country.type';

export interface RuleType {
  id: RuleEnum;
  name: string;
  level: number;
  numberOfTeams: number;
  description: number;
  defaultCompetitionName: string;
  defaultCompetitionSrcImage: string;

  country?: CountryType;
}
