import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompetitionsaveType } from '../../../shared/types/Competitionsave.type';
import { SaveType } from '../../../shared/types/Save.type';

interface SavePlayState {
  savePlay?: SaveType;
  savePlayCompetitionssave: CompetitionsaveType[];
  savePlayCompetitionsave?: CompetitionsaveType;
}

const initialState: SavePlayState = {
  savePlay: undefined,
  savePlayCompetitionssave: [],
  savePlayCompetitionsave: undefined,
};

export const counterSlice = createSlice({
  name: 'savePlayReducer',
  initialState,
  reducers: {
    setSavePlayAction: (state, action: PayloadAction<SaveType | undefined>) => {
      state.savePlay = action.payload;
    },
    setSavePlayCompetitionssaveAction: (state, action: PayloadAction<CompetitionsaveType[]>) => {
      state.savePlayCompetitionssave = action.payload;
    },
    setSavePlayCompetitionsaveAction: (
      state,
      action: PayloadAction<CompetitionsaveType | undefined>,
    ) => {
      state.savePlayCompetitionsave = action.payload;
    },
  },
});

export const {
  setSavePlayAction,
  setSavePlayCompetitionssaveAction,
  setSavePlayCompetitionsaveAction,
} = counterSlice.actions;

export default counterSlice.reducer;
