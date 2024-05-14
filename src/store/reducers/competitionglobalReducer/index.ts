import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompetitionglobalType } from '../../../shared/types/CompetitionglobalType';

interface CompetitionglobalState {
  competitionsglobal: CompetitionglobalType[];
}

const initialState: CompetitionglobalState = {
  competitionsglobal: [],
};

export const counterSlice = createSlice({
  name: 'competitiongloballReducer',
  initialState,
  reducers: {
    setCompetitionsglobalAction: (state, action: PayloadAction<CompetitionglobalType[]>) => {
      state.competitionsglobal = action.payload;
    },
  },
});

export const { setCompetitionsglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
