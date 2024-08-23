import { CompetitionsaveType } from './Competitionsave.type';
import { TeamsaveType } from './Teamsave.type';

export interface CompetitionsaveTeamsaveType {
  id: number;

  competitionsave?: CompetitionsaveType;
  teamsave?: TeamsaveType;
}
