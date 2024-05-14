import { configureStore } from '@reduxjs/toolkit';

import competitionglobalReducer from './reducers/competitionglobalReducer';
import countryReducer from './reducers/countryReducer';
import globalReducer from './reducers/globalReducer';
import managerglobalReducer from './reducers/managerglobalReducer';
import ruleReducer from './reducers/ruleReducer';
import teamglobalReducer from './reducers/teamglobalReducer';

export const store = configureStore({
  reducer: {
    managerglobalReducer,
    competitionglobalReducer,
    ruleReducer,
    teamglobalReducer,
    globalReducer,
    countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
