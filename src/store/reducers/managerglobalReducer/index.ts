import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ManagerglobalType } from '../../../shared/types/Managerglobal.type';

interface ManagerglobalState {
  managersglobal: ManagerglobalType[];
  managerglobal?: ManagerglobalType;
}

const initialState: ManagerglobalState = {
  managersglobal: [],
  managerglobal: undefined,
};

export const counterSlice = createSlice({
  name: 'managerglobalReducer',
  initialState,
  reducers: {
    setManagersglobalAction: (state, action: PayloadAction<ManagerglobalType[]>) => {
      state.managersglobal = action.payload;
    },
    setManagerglobalAction: (state, action: PayloadAction<ManagerglobalType | undefined>) => {
      state.managerglobal = action.payload;
    },
  },
});

export const { setManagersglobalAction, setManagerglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
