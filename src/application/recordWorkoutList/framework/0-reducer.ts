import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
  initialState,
  reducers: {
    getList: (state, { payload }: { payload: { uid: string } }) => state,
    getAudioBufferPaths: (
      state,
      { payload }: { payload: { workoutIds: string[] } }
    ) => state,
    setWorkoutIds: (state, { payload }: { payload: string[] }) => {
      state.workoutIds = payload;
      state.workoutIdsInitializing = false;
    },
    removeAudioBufferStart: (state, { payload }: { payload: string }) => state,
  },
});

export const recordWorkoutListActions = recordWorkoutListSlice.actions;

export default recordWorkoutListSlice.reducer;
