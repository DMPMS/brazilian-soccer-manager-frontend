import { PositionEnum } from '../enums/Position.enum';
import { PositionAreaEnum } from '../enums/PositionArea.enum';

export interface PositionType {
  id: PositionEnum;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;
}
