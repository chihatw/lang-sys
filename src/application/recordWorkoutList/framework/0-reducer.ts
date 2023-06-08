import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
  initialState,
  reducers: {
    fetchRecordWorkoutsStart: (state) => {
      state.isFetching = true;
    },
    fetchRecordWorkoutsSuccess: (
      state,
      {
        payload,
      }: {
        payload: {
          workoutIds: string[];
          audioBuffers: { [id: string]: AudioBuffer };
        };
      }
    ) => {
      state.isFetching = false;
      state.workoutIds = payload.workoutIds;
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
