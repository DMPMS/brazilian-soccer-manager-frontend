export interface InsertSaveDTO {
  name: string;
  competitionsglobalRuleCountryId?: number;
  competitionglobalId?: number;
  teamglobalId?: number;
  isCustomManager: boolean;
  managerCountryId?: number;
  managerName: string;
  managerBirthdate: string;
}
