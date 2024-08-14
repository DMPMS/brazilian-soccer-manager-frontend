export interface InsertSaveDTO {
  name: string;
  competitionsglobalCountryId?: number;
  competitionglobalId?: number;
  teamglobalId?: number;
  isCustomManager: boolean;
  managerCountryId?: number;
  managerName: string;
  managerBirthdate: string;
}
