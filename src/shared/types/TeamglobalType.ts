import { CompetitionglobalTeamglobalType } from './CompetitionglobalTeamglobal';
import { CountryType } from './CountryType';
import { ManagerglobalType } from './ManagerglobalType';
import { PlayerglobalType } from './PlayerglobalType';

export interface TeamglobalType {
  id: number;
  name: string;
  srcImage: string;
  country?: CountryType;
  managerglobal?: ManagerglobalType;
  playersglobal?: PlayerglobalType[];
  competitionsglobalTeamglobal?: CompetitionglobalTeamglobalType[];
}
