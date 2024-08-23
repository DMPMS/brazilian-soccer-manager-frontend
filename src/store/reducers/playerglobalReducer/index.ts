import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlayerglobalType } from '../../../shared/types/Playerglobal.type';

interface PlayerglobalState {
  playersglobal: PlayerglobalType[];
  playerglobal?: PlayerglobalType;
}

const initialState: PlayerglobalState = {
  playersglobal: [],
  playerglobal: undefined,
};

export const counterSlice = createSlice({
  name: 'playerglobalReducer',
  initialState,
  reducers: {
    setPlayersglobalAction: (state, action: PayloadAction<PlayerglobalType[]>) => {
      state.playersglobal = action.payload;
    },
    setPlayerglobalAction: (state, action: PayloadAction<PlayerglobalType | undefined>) => {
      state.playerglobal = action.payload;
    },
  },
});

export const { setPlayersglobalAction, setPlayerglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
