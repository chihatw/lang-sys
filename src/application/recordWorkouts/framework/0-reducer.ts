import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutsSlice = createSlice({
  name: 'recordWorkouts',
  initialState,
  reducers: {},
});

export const recordWorkoutActions = recordWorkoutsSlice.actions;

export default recordWorkoutsSlice.reducer;
