export interface InsertPlayerglobalDTO {
  name: string;
  age: number;
  overall: number;
  countryId?: number;
  teamglobalId?: number;
  primaryPositionIds: number[];
  secondaryPositionIds: number[];
}
