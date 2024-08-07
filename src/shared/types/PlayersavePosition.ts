import { PlayersaveType } from './PlayersaveType';
import { PositionType } from './PositionType';

export interface PlayersavePositionType {
  id: number;
  rating: number;
  playersave?: PlayersaveType;
  position?: PositionType;
}
