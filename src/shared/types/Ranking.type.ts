import { CompetitionsaveType } from './Competitionsave.type';
import { TeamsaveType } from './Teamsave.type';

export interface RankingType {
  id: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDifference: number;

  competitionsave?: CompetitionsaveType;
  teamsave?: TeamsaveType;
}
