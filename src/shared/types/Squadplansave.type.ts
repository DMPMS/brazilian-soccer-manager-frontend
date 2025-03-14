import { FormationType } from './Formation.type';

export interface SquadplansaveType {
  id: number;
  playersaveIds: number[];

  formation?: FormationType;
}
