import { CompetitionsaveType } from './CompetitionsaveType';
import { TeamsaveType } from './TeamsaveType';

export interface CompetitionsaveTeamsaveType {
  id: number;
  competitionsave?: CompetitionsaveType;
  teamsave?: TeamsaveType;
}
