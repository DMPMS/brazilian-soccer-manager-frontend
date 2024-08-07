import { CompetitionsaveTeamsaveType } from './CompetitionsaveTeamsave';
import { CountryType } from './CountryType';
import { RuleType } from './RuleType';

export interface CompetitionsaveType {
  id: number;
  name: string;
  season: string;
  srcImage: string;
  rule?: RuleType;
  country?: CountryType;
  competitionssaveTeamsave?: CompetitionsaveTeamsaveType[];
}
