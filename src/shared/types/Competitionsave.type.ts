import { CompetitionsaveTeamsaveType } from './CompetitionsaveTeamsave.type';
import { CountryType } from './Country.type';
import { RoundType } from './Round.type';
import { RuleType } from './Rule.type';

export interface CompetitionsaveType {
  id: number;
  name: string;
  season: string;
  srcImage: string;

  rule?: RuleType;
  country?: CountryType;
  competitionssaveTeamsave?: CompetitionsaveTeamsaveType[];
  rounds?: RoundType[];
}
