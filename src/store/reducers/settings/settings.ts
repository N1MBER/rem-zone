import { State } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffGroup, Position } from '../../../types/user';

const initialState: State = {
  groups: [],
  positions: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<StaffGroup[]>) => {
      state.groups = action.payload;
    },
    setPositions: (state, action: PayloadAction<Position[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { setGroup, setPositions } = settingsSlice.actions;

export default settingsSlice.reducer;
