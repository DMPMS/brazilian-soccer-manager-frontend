import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TeamsglobalType } from '../../../shared/types/TeamsglobalType';

interface TeamglobalState {
  teamsglobal: TeamsglobalType[];
}

const initialState: TeamglobalState = {
  teamsglobal: [],
};

export const counterSlice = createSlice({
  name: 'teamglobalReducer',
  initialState,
  reducers: {
    setTeamsglobalAction: (state, action: PayloadAction<TeamsglobalType[]>) => {
      state.teamsglobal = action.payload;
    },
  },
});

export const { setTeamsglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
