import { RoundType } from './Round.type';
import { TeamsaveType } from './Teamsave.type';

export interface MatchType {
  id: number;
  date: string;
  teamsaveHomeGoals: number | null;
  teamsaveAwayGoals: number | null;

  round?: RoundType;
  teamsaveHome?: TeamsaveType;
  teamsaveAway?: TeamsaveType;
}
