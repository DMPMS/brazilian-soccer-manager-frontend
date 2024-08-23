import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RuleType } from '../../../shared/types/Rule.type';

interface RuleState {
  rules: RuleType[];
}

const initialState: RuleState = {
  rules: [],
};

export const counterSlice = createSlice({
  name: 'ruleReducer',
  initialState,
  reducers: {
    setRulesAction: (state, action: PayloadAction<RuleType[]>) => {
      state.rules = action.payload;
    },
  },
});

export const { setRulesAction } = counterSlice.actions;

export default counterSlice.reducer;
