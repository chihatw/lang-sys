import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
  initialState,
  reducers: {
    getListStart: (state, { payload }: { payload: { uid: string } }) => state,
    getAudioBuffersStart: (
      state,
      { payload }: { payload: { paths: string[] } }
    ) => state,
    setWorkoutIds: (state, { payload }: { payload: string[] }) => {
      state.workoutIds = payload;
      state.workoutIdsInitializing = false;
    },
    removeStorageAudioBufferStart: (
      state,
      { payload }: { payload: { path: string } }
    ) => state,
  },
});

export const recordWorkoutListActions = recordWorkoutListSlice.actions;

export default recordWorkoutListSlice.reducer;
