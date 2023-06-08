import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { IRecordWorkout } from '../../recordWorkouts/core/0-interface';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
  initialState,
  reducers: {
    fetchRecordWorkoutsStart: (state) => {
      state.isFetching = true;
      if (Object.keys(state.workouts).length) {
        state.workouts = {};
      }
      state.errorMsg = '';
    },
    fetchRecordWorkoutsSuccess: (
      state,
      {
        payload,
      }: {
        payload: {
          workouts: { [id: string]: IRecordWorkout };
          audioBuffers: { [id: string]: AudioBuffer };
        };
      }
    ) => {
      state.isFetching = false;
      state.workouts = payload.workouts;
      state.audioBuffers = payload.audioBuffers;
    },
    removeAudioBuffer: (state, { payload }: { payload: string }) => {
      const currentAudioBuffers = { ...state.audioBuffers };
      delete currentAudioBuffers[payload];
      state.audioBuffers = currentAudioBuffers;
    },
  },
});

export const recordWorkoutListActions = recordWorkoutListSlice.actions;

export default recordWorkoutListSlice.reducer;
