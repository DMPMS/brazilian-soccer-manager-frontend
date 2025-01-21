import { PositionEnum } from '../enums/Position.enum';

export interface InsertPlayerglobalDTO {
  name: string;
  birthdate: string;
  overall: number;
  countryId?: number;
  teamglobalId?: number;
  primaryPositionIds: PositionEnum[];
  secondaryPositionIds: PositionEnum[];
}
