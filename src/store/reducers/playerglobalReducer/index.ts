import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlayerglobalType } from '../../../shared/types/PlayerglobalType';

interface PlayerglobalState {
  playersglobal: PlayerglobalType[];
  playersglobalWithoutTeamglobal: PlayerglobalType[];
  playerglobal?: PlayerglobalType;
}

const initialState: PlayerglobalState = {
  playersglobal: [],
  playersglobalWithoutTeamglobal: [],
  playerglobal: undefined,
};

export const counterSlice = createSlice({
  name: 'playerglobalReducer',
  initialState,
  reducers: {
    setPlayersglobalAction: (state, action: PayloadAction<PlayerglobalType[]>) => {
      state.playersglobal = action.payload;
    },
    setPlayersglobalWithoutTeamglobalAction: (state, action: PayloadAction<PlayerglobalType[]>) => {
      state.playersglobalWithoutTeamglobal = action.payload;
    },
    setPlayerglobalAction: (state, action: PayloadAction<PlayerglobalType | undefined>) => {
      state.playerglobal = action.payload;
    },
  },
});

export const {
  setPlayersglobalAction,
  setPlayersglobalWithoutTeamglobalAction,
  setPlayerglobalAction,
} = counterSlice.actions;

export default counterSlice.reducer;
