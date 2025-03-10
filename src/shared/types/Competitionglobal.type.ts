import { CompetitionglobalTeamglobalType } from './CompetitionglobalTeamglobal.type';
import { RuleType } from './Rule.type';

export interface CompetitionglobalType {
  id: number;
  name: string;
  season: string;
  srcImage: string;

  rule?: RuleType;
  competitionsglobalTeamglobal?: CompetitionglobalTeamglobalType[];
}
