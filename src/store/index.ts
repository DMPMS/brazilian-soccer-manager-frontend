import { configureStore } from '@reduxjs/toolkit';

import competitionglobalReducer from './reducers/competitionglobalReducer';
import countryReducer from './reducers/countryReducer';
import formationReducer from './reducers/formationReducer';
import globalReducer from './reducers/globalReducer';
import managerglobalReducer from './reducers/managerglobalReducer';
import playerglobalReducer from './reducers/playerglobalReducer';
import positionReducer from './reducers/positionReducer';
import ruleReducer from './reducers/ruleReducer';
import savePlayReducer from './reducers/savePlayReducer';
import saveReducer from './reducers/saveReducer';
import teamglobalReducer from './reducers/teamglobalReducer';

export const store = configureStore({
  reducer: {
    managerglobalReducer,
    competitionglobalReducer,
    ruleReducer,
    teamglobalReducer,
    globalReducer,
    countryReducer,
    positionReducer,
    playerglobalReducer,
    saveReducer,
    savePlayReducer,
    formationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
