import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';

interface ManagerglobalState {
  managersglobal: ManagerglobalType[];
}

const initialState: ManagerglobalState = {
  managersglobal: [],
};

export const counterSlice = createSlice({
  name: 'managerglobalReducer',
  initialState,
  reducers: {
    setManagersglobalAction: (state, action: PayloadAction<ManagerglobalType[]>) => {
      state.managersglobal = action.payload;
    },
  },
});

export const { setManagersglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
