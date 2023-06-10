import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
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

export const recordWorkoutListActions = recordWorkoutListSlice.actions;

export default recordWorkoutListSlice.reducer;
