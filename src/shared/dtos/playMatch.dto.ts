import { PlayersaveType } from '../types/Playersave.type';
import { SquadplansaveType } from '../types/Squadplansave.type';
import { TeamsaveType } from '../types/Teamsave.type';

export interface PlayMatchDTO {
  teamsaveHomeGoals: number;
  teamsaveHome?: TeamsaveType;
  teamsaveHomePlayerssave?: PlayersaveType[];
  teamsaveHomeSquadplansave?: SquadplansaveType;

  teamsaveAwayGoals: number;
  teamsaveAway?: TeamsaveType;
  teamsaveAwayPlayerssave?: PlayersaveType[];
  teamsaveAwaySquadplansave?: SquadplansaveType;
}
