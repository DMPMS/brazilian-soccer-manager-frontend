import { CompetitionglobalTeamglobalType } from './CompetitionglobalTeamglobal';
import { CountryType } from './CountryType';
import { RuleType } from './RuleType';

export interface CompetitionglobalType {
  id: number;
  name: string;
  season: string;
  srcImage: string;
  rule?: RuleType;
  country?: CountryType;
  competitionsglobalTeamglobal?: CompetitionglobalTeamglobalType[];
}
