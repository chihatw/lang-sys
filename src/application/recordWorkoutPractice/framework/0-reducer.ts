import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { shuffle } from '../../../services/utils';

const recordWorkoutPracticeSlice = createSlice({
  name: 'recordWorkoutPractice',
  initialState,
  reducers: {
    initiate: (state, { payload }: { payload: { workoutId: string } }) =>
      initialState,
    setWorkoutIdAndShuffledCueIds: (
      state,
      { payload }: { payload: { workoutId: string; shuffledCueIds: string[] } }
    ) => {
      state.workoutId = payload.workoutId;
      state.shuffledCueIds = payload.shuffledCueIds;
    },
    setChenVoiceStart: (state) => state,
    setScene: (state, { payload }: { payload: string }) => {
      state.scene = payload;
    },
    increseCurrentIndex: (state) => {
      state.currentIndex++;
    },
    saveRecordedAudioBuffer: (state) => initialState,
    abandomRecordedAudioBuffer: (state) => {
      return {
        ...initialState,
        workoutId: state.workoutId,
        shuffledCueIds: shuffle([...state.shuffledCueIds]),
      };
    },
  },
});

export const recordWorkoutPracticeActions = recordWorkoutPracticeSlice.actions;

export default recordWorkoutPracticeSlice.reducer;
