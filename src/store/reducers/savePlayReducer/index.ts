import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompetitionsaveType } from '../../../shared/types/Competitionsave.type';
import { MatchType } from '../../../shared/types/Match.type';
import { SaveType } from '../../../shared/types/Save.type';

interface SavePlayState {
  savePlay?: SaveType;
  savePlayCompetitionssave: CompetitionsaveType[];
  savePlayCompetitionsave?: CompetitionsaveType;
  savePlayPlayMatch?: MatchType;
}

const initialState: SavePlayState = {
  savePlay: undefined,
  savePlayCompetitionssave: [],
  savePlayCompetitionsave: undefined,
  savePlayPlayMatch: undefined,
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
    setSavePlayPlayMatchAction: (state, action: PayloadAction<MatchType | undefined>) => {
      state.savePlayPlayMatch = action.payload;
    },
  },
});

export const {
  setSavePlayAction,
  setSavePlayCompetitionssaveAction,
  setSavePlayCompetitionsaveAction,
  setSavePlayPlayMatchAction,
} = counterSlice.actions;

export default counterSlice.reducer;
