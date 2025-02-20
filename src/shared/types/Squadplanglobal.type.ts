import { FormationType } from './Formation.type';

export interface SquadplanglobalType {
  id: number;
  playerglobalIds: number[];

  formation?: FormationType;
}
