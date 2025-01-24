import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SaveType } from '../../../shared/types/Save.type';

interface SavePlayState {
  savePlay?: SaveType;
}

const initialState: SavePlayState = {
  savePlay: undefined,
};

export const counterSlice = createSlice({
  name: 'savePlayReducer',
  initialState,
  reducers: {
    setSavePlayAction: (state, action: PayloadAction<SaveType | undefined>) => {
      state.savePlay = action.payload;
    },
  },
});

export const { setSavePlayAction } = counterSlice.actions;

export default counterSlice.reducer;
