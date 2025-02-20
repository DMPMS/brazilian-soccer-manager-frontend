export interface InsertTeamglobalDTO {
  name: string;
  srcImage: string;
  countryId?: number;
  managerglobalId?: number;
  playerglobalIds: number[];
  squadplanglobalFormationId: number;
  squadplanglobalPlayerglobalIds: number[];
}
