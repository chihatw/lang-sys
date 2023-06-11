import { createSlice } from '@reduxjs/toolkit';
import { SCENE, initialState } from '../core/1-constants';
import { shuffle } from 'application/utils/utils';

const chineseCueWorkoutPracticeSlice = createSlice({
  name: 'chineseCueWorkoutPractice',
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
    setRecordedVoiceStart: (state) => state,
    startPractice: (state) => {
      state.scene = SCENE.practice;
    },
    increseCurrentIndex: (state) => {
      state.currentIndex++;
    },
    startRecording: (state) => {
      state.isRunning = true;
    },
    setAudioBuffer: (state, { payload }: { payload: AudioBuffer }) => {
      state.audioBuffer = payload;
    },
    stopRecording: (state) => {
      state.scene = SCENE.check;
    },
    saveAudioBuffer: (state, { payload }: { payload: Blob }) => state,
    clearState: (state) => initialState,
    abandomAudioBuffer: (state) => {
      return {
        ...initialState,
        workoutId: state.workoutId,
        shuffledCueIds: shuffle([...state.shuffledCueIds]),
      };
    },
  },
});

export const chineseCueWorkoutPracticeActions =
  chineseCueWorkoutPracticeSlice.actions;

export default chineseCueWorkoutPracticeSlice.reducer;
