import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { IChineseCueWorkout } from '../core/0-interface';

const chineseCueWorkoutsSlice = createSlice({
  name: 'chineseCueWorkouts',
  initialState,
  reducers: {
    setWorkouts: (
      state,
      { payload }: { payload: { [id: string]: IChineseCueWorkout } }
    ) => ({ ...state, ...payload }),
  },
});

export const chineseCueWorkoutsActions = chineseCueWorkoutsSlice.actions;

export default chineseCueWorkoutsSlice.reducer;
