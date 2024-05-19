import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';

interface ManagerglobalState {
  managersglobal: ManagerglobalType[];
  managersglobalWithoutTeamglobal: ManagerglobalType[];
  managerglobal?: ManagerglobalType;
}

const initialState: ManagerglobalState = {
  managersglobal: [],
  managersglobalWithoutTeamglobal: [],
  managerglobal: undefined,
};

export const counterSlice = createSlice({
  name: 'managerglobalReducer',
  initialState,
  reducers: {
    setManagersglobalAction: (state, action: PayloadAction<ManagerglobalType[]>) => {
      state.managersglobal = action.payload;
    },
    setManagersglobalWithoutTeamglobalAction: (
      state,
      action: PayloadAction<ManagerglobalType[]>,
    ) => {
      state.managersglobalWithoutTeamglobal = action.payload;
    },
    setManagerglobalAction: (state, action: PayloadAction<ManagerglobalType | undefined>) => {
      state.managerglobal = action.payload;
    },
  },
});

export const {
  setManagersglobalAction,
  setManagersglobalWithoutTeamglobalAction,
  setManagerglobalAction,
} = counterSlice.actions;

export default counterSlice.reducer;
