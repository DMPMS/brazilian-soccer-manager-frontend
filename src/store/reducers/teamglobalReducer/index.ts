import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TeamglobalType } from '../../../shared/types/TeamglobalType';

interface TeamglobalState {
  teamsglobal: TeamglobalType[];
  teamglobal?: TeamglobalType;
}

const initialState: TeamglobalState = {
  teamsglobal: [],
  teamglobal: undefined,
};

export const counterSlice = createSlice({
  name: 'teamglobalReducer',
  initialState,
  reducers: {
    setTeamsglobalAction: (state, action: PayloadAction<TeamglobalType[]>) => {
      state.teamsglobal = action.payload;
    },
    setTeamglobalAction: (state, action: PayloadAction<TeamglobalType | undefined>) => {
      state.teamglobal = action.payload;
    },
  },
});

export const { setTeamsglobalAction, setTeamglobalAction } = counterSlice.actions;

export default counterSlice.reducer;
