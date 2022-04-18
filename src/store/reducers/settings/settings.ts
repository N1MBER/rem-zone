import { State } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffGroup } from '../../../types/user';

const initialState: State = {
  groups: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<StaffGroup[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroup } = settingsSlice.actions;

export default settingsSlice.reducer;
