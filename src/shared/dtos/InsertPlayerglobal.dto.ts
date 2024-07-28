export interface InsertPlayerglobalDTO {
  name: string;
  birthdate: string;
  overall: number;
  countryId?: number;
  teamglobalId?: number;
  primaryPositionIds: number[];
  secondaryPositionIds: number[];
}
