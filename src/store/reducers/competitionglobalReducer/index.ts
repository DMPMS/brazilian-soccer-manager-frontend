import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompetitionglobalType } from '../../../shared/types/CompetitionglobalType';

interface CompetitionglobalState {
  competitionsglobal: CompetitionglobalType[];
  competitionglobal?: CompetitionglobalType;
}

const initialState: CompetitionglobalState = {
  competitionsglobal: [],
  competitionglobal: undefined,
};

export const counterSlice = createSlice({
  name: 'competitiongloballReducer',
  initialState,
  reducers: {
    setCompetitionsglobalAction: (state, action: PayloadAction<CompetitionglobalType[]>) => {
      state.competitionsglobal = action.payload;
    },
    setCompetitionglobalAction: (
      state,
      action: PayloadAction<CompetitionglobalType | undefined>,
    ) => {
      state.competitionglobal = action.payload;
    },
  },
});

export const { setCompetitionsglobalAction, setCompetitionglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
