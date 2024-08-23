import { CountryType } from './Country.type';
import { PlayerglobalPositionType } from './PlayerglobalPosition.type';
import { TeamglobalType } from './Teamglobal.type';

export interface PlayerglobalType {
  id: number;
  name: string;
  birthdate: string;
  overall: number;
  playersglobalPosition?: PlayerglobalPositionType[];

  country?: CountryType;
  teamglobal?: TeamglobalType;
}
