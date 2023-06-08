import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutPracticeSlice = createSlice({
  name: 'recordWorkoutPractice',
  initialState,
  reducers: {
    fetchRecordWorkout: (state, { payload }: { payload: string }) => state,
  },
});

export const recordWorkoutPracticeActions = recordWorkoutPracticeSlice.actions;

export default recordWorkoutPracticeSlice.reducer;
