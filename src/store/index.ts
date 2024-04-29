import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './reducers/countryReducer';
import globalReducer from './reducers/globalReducer';
import managerglobalReducer from './reducers/managerglobalReducer';
import teamglobalReducer from './reducers/teamglobalReducer';

export const store = configureStore({
  reducer: {
    managerglobalReducer,
    teamglobalReducer,
    globalReducer,
    countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
