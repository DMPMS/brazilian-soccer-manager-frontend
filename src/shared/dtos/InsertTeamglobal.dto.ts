import { FormationEnum } from '../enums/Formation.enum';

export interface InsertTeamglobalDTO {
  name: string;
  srcImage: string;
  countryId?: number;
  managerglobalId?: number;
  playerglobalIds: number[];
  squadplanglobalFormationId: FormationEnum;
  squadplanglobalPlayerglobalIds: number[];
}
