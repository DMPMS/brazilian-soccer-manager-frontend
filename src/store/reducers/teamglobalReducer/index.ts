import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TeamglobalType } from '../../../shared/types/TeamglobalType';

interface TeamglobalState {
  teamsglobal: TeamglobalType[];
}

const initialState: TeamglobalState = {
  teamsglobal: [],
};

export const counterSlice = createSlice({
  name: 'teamglobalReducer',
  initialState,
  reducers: {
    setTeamsglobalAction: (state, action: PayloadAction<TeamglobalType[]>) => {
      state.teamsglobal = action.payload;
    },
  },
});

export const { setTeamsglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
