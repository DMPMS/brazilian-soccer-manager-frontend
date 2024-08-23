import { CompetitionglobalTeamglobalType } from './CompetitionglobalTeamglobal.type';
import { CountryType } from './Country.type';
import { ManagerglobalType } from './Managerglobal.type';
import { PlayerglobalType } from './Playerglobal.type';

export interface TeamglobalType {
  id: number;
  name: string;
  srcImage: string;
  playersglobalCount: number;

  country?: CountryType;
  managerglobal?: ManagerglobalType;
  playersglobal?: PlayerglobalType[];
  competitionsglobalTeamglobal?: CompetitionglobalTeamglobalType[];
}
