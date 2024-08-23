import { CompetitionglobalType } from './Competitionglobal.type';
import { TeamglobalType } from './Teamglobal.type';

export interface CompetitionglobalTeamglobalType {
  id: number;
  competitionglobal?: CompetitionglobalType;
  teamglobal?: TeamglobalType;
}
