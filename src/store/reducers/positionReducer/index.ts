import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PositionType } from '../../../shared/types/PositionType';

interface PositionState {
  positions: PositionType[];
}

const initialState: PositionState = {
  positions: [],
};

export const counterSlice = createSlice({
  name: 'positionReducer',
  initialState,
  reducers: {
    setPositionsAction: (state, action: PayloadAction<PositionType[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { setPositionsAction } = counterSlice.actions;

export default counterSlice.reducer;
