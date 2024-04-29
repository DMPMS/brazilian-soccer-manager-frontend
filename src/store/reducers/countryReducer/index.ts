import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CountryType } from '../../../shared/types/CountryType';

interface CountryState {
  countries: CountryType[];
}

const initialState: CountryState = {
  countries: [],
};

export const counterSlice = createSlice({
  name: 'countryReducer',
  initialState,
  reducers: {
    setCountriesAction: (state, action: PayloadAction<CountryType[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountriesAction } = counterSlice.actions;

export default counterSlice.reducer;
