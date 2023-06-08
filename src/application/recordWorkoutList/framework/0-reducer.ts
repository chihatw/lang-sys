import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordWorkoutListSlice = createSlice({
  name: 'recordWorkoutList',
  initialState,
  reducers: {
    initiate: () => {},
    setProps: (
      state,
      {
        payload,
      }: {
        payload: {
          workoutIds: string[];
          audioBufferPaths: string[];
        };
      }
    ) => {
      state.workoutIds = payload.workoutIds;
      state.audioBufferPaths = payload.audioBufferPaths;
    },
    removeAudioBufferPath: (state, { payload }: { payload: string }) => {
      const audioBufferPaths = [...state.audioBufferPaths].filter(
        (path) => path !== payload
      );
      state.audioBufferPaths = audioBufferPaths;
    },
  },
});

export const recordWorkoutListActions = recordWorkoutListSlice.actions;

export default recordWorkoutListSlice.reducer;
