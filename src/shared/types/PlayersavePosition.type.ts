import { PositionRatingEnum } from '../enums/PositionRating.enum';
import { PlayersaveType } from './Playersave.type';
import { PositionType } from './Position.type';

export interface PlayersavePositionType {
  id: number;
  rating: PositionRatingEnum;

  playersave?: PlayersaveType;
  position?: PositionType;
}
