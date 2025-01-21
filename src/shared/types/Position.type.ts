import { PositionAreaEnum } from '../enums/PositionArea.enum';

export interface PositionType {
  id: number;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;
}
