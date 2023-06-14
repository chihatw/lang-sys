import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
  initialState,
  reducers: {
    initiate: (state) => {
      state.workoutIdsInitializing = false;
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

export const recordWorkoutListActions = recordWorkoutListSlice.actions;

export default recordWorkoutListSlice.reducer;
