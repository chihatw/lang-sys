import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const chineseCueWorkoutListSlice = createSlice({
  name: 'chineseCueWorkoutList',
  initialState,
  reducers: {
    initiate: (state) => {
      state.initializing = false;
    },
    setWorkoutIds: (state, { payload }: { payload: string[] }) => {
      state.workoutIds = payload;
    },
    getAudioBuffersStart: (
      state,
      { payload }: { payload: { paths: string[] } }
    ) => {
      state.audioBuffersInitializing = false;
    },
    resetState: () => initialState,
  },
});

export const chineseCueWorkoutListActions = chineseCueWorkoutListSlice.actions;

export default chineseCueWorkoutListSlice.reducer;
