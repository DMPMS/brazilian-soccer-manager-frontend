import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SaveType } from '../../../shared/types/Save.type';

interface SaveState {
  saves: SaveType[];
  save?: SaveType;
}

const initialState: SaveState = {
  saves: [],
  save: undefined,
};

export const counterSlice = createSlice({
  name: 'saveReducer',
  initialState,
  reducers: {
    setSavesAction: (state, action: PayloadAction<SaveType[]>) => {
      state.saves = action.payload;
    },
    setSaveAction: (state, action: PayloadAction<SaveType | undefined>) => {
      state.save = action.payload;
    },
  },
});

export const { setSavesAction, setSaveAction } = counterSlice.actions;

export default counterSlice.reducer;
