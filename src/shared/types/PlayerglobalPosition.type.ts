import { PositionRatingEnum } from '../enums/PositionRating.enum';
import { PlayerglobalType } from './Playerglobal.type';
import { PositionType } from './Position.type';

export interface PlayerglobalPositionType {
  id: number;
  rating: PositionRatingEnum;

  playerglobal?: PlayerglobalType;
  position?: PositionType;
}
