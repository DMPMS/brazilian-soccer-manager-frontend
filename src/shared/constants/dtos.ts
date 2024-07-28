export const DEFAULT_LOGIN = {
  email: '',
  password: '',
};

export const DEFAULT_USER = {
  name: '',
  birthdate: '',
  countryId: undefined,
  email: '',
  password: '',
  confirmPassword: '',
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
