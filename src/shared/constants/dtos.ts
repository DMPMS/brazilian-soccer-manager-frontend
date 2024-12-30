export const DEFAULT_SIGN_IN = {
  email: '',
  password: '',
};

export const DEFAULT_SIGN_UP = {
  name: '',
  birthdate: '',
  countryId: undefined,
  email: '',
  password: '',
  confirmPassword: '',
};

export const DEFAULT_SAVE = {
  name: '',
  competitionsglobalCountryId: undefined,
  competitionglobalId: undefined,
  teamglobalId: undefined,
  isCustomManager: false,
  managerCountryId: undefined,
  managerName: '',
  managerBirthdate: '',
};

export const DEFAULT_CUSTOMMANAGER = {
  managerName: '',
  managerBirthdate: '',
  managerCountryId: undefined,
};

export const DEFAULT_MANAGERGLOBAL = {
  name: '',
  birthdate: '',
  countryId: undefined,
};

export const DEFAULT_PLAYERGLOBAL = {
  name: '',
  birthdate: '',
  overall: 0,
  countryId: undefined,
  teamglobalId: undefined,
  primaryPositionIds: [],
  secondaryPositionIds: [],
};

export const DEFAULT_TEAMGLOBAL = {
  name: '',
  srcImage: '',
  countryId: undefined,
  managerglobalId: undefined,
  playerglobalIds: [],
};

export const DEFAULT_COMPETITIONGLOBAL = {
  name: '',
  season: '',
  srcImage: '',
  ruleId: undefined,
  countryId: undefined,
  teamglobalIds: [],
};
