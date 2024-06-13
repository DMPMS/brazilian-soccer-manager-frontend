export const DEFAULT_LOGIN = {
  email: '',
  password: '',
};

export const DEFAULT_MANAGERGLOBAL = {
  name: '',
  age: 0,
  countryId: undefined,
};

export const DEFAULT_PLAYERGLOBAL = {
  name: '',
  age: 0,
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
