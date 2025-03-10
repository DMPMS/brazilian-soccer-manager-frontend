import { CompetitionsaveTeamsaveType } from './CompetitionsaveTeamsave.type';
import { RankingType } from './Ranking.type';
import { RoundType } from './Round.type';
import { RuleType } from './Rule.type';

export interface CompetitionsaveType {
  id: number;
  name: string;
  season: string;
  srcImage: string;

  rule?: RuleType;
  competitionssaveTeamsave?: CompetitionsaveTeamsaveType[];
  rounds?: RoundType[];
  rankings?: RankingType[];
}
