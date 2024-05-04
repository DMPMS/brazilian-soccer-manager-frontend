import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';

interface ManagerglobalState {
  managersglobal: ManagerglobalType[];
  managersglobalWithoutTeamglobal: ManagerglobalType[];
}

const initialState: ManagerglobalState = {
  managersglobal: [],
  managersglobalWithoutTeamglobal: [],
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
  },
});

export const { setManagersglobalAction, setManagersglobalWithoutTeamglobalAction } =
  counterSlice.actions;

export default counterSlice.reducer;
