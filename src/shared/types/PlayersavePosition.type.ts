import { PlayersaveType } from './Playersave.type';
import { PositionType } from './Position.type';

export interface PlayersavePositionType {
  id: number;
  rating: number;

  playersave?: PlayersaveType;
  position?: PositionType;
}
