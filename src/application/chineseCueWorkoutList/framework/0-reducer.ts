import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const chineseCueWorkoutListSlice = createSlice({
  name: 'chineseCueWorkoutList',
  initialState,
  reducers: {
    getListStart: (state, { payload }: { payload: { uid: string } }) => {
      state.workoutIdsInitializing = false;
    },
    getAudioBuffersStart: (
      state,
      { payload }: { payload: { paths: string[] } }
    ) => {
      state.audioBuffersInitializing = false;
    },
    setWorkoutIds: (state, { payload }: { payload: string[] }) => {
      state.workoutIds = payload;
    },
    removeStorageAudioBufferStart: (
      state,
      { payload }: { payload: { path: string } }
    ) => state,
  },
});

export const chineseCueWorkoutListActions = chineseCueWorkoutListSlice.actions;

export default chineseCueWorkoutListSlice.reducer;
