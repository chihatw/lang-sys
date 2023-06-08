import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { SCENE } from '../../../views/pages/Workout/commons';

const recordWorkoutPracticeSlice = createSlice({
  name: 'recordWorkoutPractice',
  initialState,
  reducers: {
    setWorkoutIdStart: (
      state,
      { payload }: { payload: { workoutId: string } }
    ) => {
      state.scene = SCENE.opening;
    },
    setWorkoutId: (state, { payload }: { payload: string }) => {
      state.workoutId = payload;
    },
    setChenVoiceStart: (state) => state,
    setScene: (state, { payload }: { payload: string }) => {
      state.scene = payload;
    },
  },
});

export const recordWorkoutPracticeActions = recordWorkoutPracticeSlice.actions;

export default recordWorkoutPracticeSlice.reducer;
