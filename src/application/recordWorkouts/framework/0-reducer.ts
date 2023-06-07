import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { IRecordWorkout } from '../core/0-interface';

const recordWorkoutsSlice = createSlice({
  name: 'recordWorkouts',
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

export const recordWorkoutsActions = recordWorkoutsSlice.actions;

export default recordWorkoutsSlice.reducer;
