import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormationType } from '../../../shared/types/Formation.type';

interface FormationState {
  formations: FormationType[];
}

const initialState: FormationState = {
  formations: [],
};

export const counterSlice = createSlice({
  name: 'formationReducer',
  initialState,
  reducers: {
    setFormationsAction: (state, action: PayloadAction<FormationType[]>) => {
      state.formations = action.payload;
    },
  },
});

export const { setFormationsAction } = counterSlice.actions;

export default counterSlice.reducer;
