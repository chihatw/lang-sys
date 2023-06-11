import { createSlice } from '@reduxjs/toolkit';
import { SCENE, initialState } from '../core/1-constants';
import { shuffle } from 'application/utils/utils';

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
    saveAudioBuffer: (state) => state,
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

export const recordWorkoutPracticeActions = recordWorkoutPracticeSlice.actions;

export default recordWorkoutPracticeSlice.reducer;
