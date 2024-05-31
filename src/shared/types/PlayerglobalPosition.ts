import { PlayerglobalType } from './PlayerglobalType';
import { PositionType } from './PositionType';

export interface PlayerglobalPositionType {
  id: number;
  rating: number;
  playerglobal?: PlayerglobalType;
  position?: PositionType;
}
