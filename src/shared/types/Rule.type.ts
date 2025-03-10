import { CountryType } from './Country.type';

export interface RuleType {
  id: number;
  name: string;
  level: number;
  numberOfTeams: number;
  description: number;
  defaultCompetitionName: string;
  defaultCompetitionSrcImage: string;

  country?: CountryType;
}
