import { CountryType } from './CountryType';
import { PlayerglobalPositionType } from './PlayerglobalPosition';
import { TeamglobalType } from './TeamglobalType';

export interface PlayerglobalType {
  id: number;
  name: string;
  birthdate: string;
  overall: number;
  playersglobalPosition?: PlayerglobalPositionType[];
  country?: CountryType;
  teamglobal?: TeamglobalType;
}
