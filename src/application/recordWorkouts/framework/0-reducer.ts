import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { IRecordWorkout } from '../core/0-interface';

const recordWorkoutsSlice = createSlice({
  name: 'recordWorkouts',
  initialState,
  reducers: {
    concatWorkouts: (
      state,
      { payload }: { payload: { [id: string]: IRecordWorkout } }
    ) => ({ ...state, ...payload }),
  },
});

export const recordWorkoutsActions = recordWorkoutsSlice.actions;

export default recordWorkoutsSlice.reducer;
