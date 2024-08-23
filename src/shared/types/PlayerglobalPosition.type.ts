import { PlayerglobalType } from './Playerglobal.type';
import { PositionType } from './Position.type';

export interface PlayerglobalPositionType {
  id: number;
  rating: number;

  playerglobal?: PlayerglobalType;
  position?: PositionType;
}
