import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addFetchedAudioBuffers: (
      state,
      { payload }: { payload: { [path: string]: AudioBuffer } }
    ) => {
      state.fetchedAudioBuffers = { ...state.fetchedAudioBuffers, ...payload };
    },
    removeStorageAudioBuffer: (state, { payload }: { payload: string }) => {
      const fetchedAudioBuffers = { ...state.fetchedAudioBuffers };
      delete fetchedAudioBuffers[payload];
      state.fetchedAudioBuffers = fetchedAudioBuffers;
    },
    setChenVoice: (state, { payload }: { payload: AudioBuffer }) => {
      state.chenVoice = payload;
    },
    setRecordedVoice: (state, { payload }: { payload: AudioBuffer }) => {
      state.recordedVoice = payload;
    },
    setBlobAndAudioBuffer: (
      state,
      { payload }: { payload: { blob: Blob; audioBuffer: AudioBuffer } }
    ) => {
      state.blob = payload.blob;
      state.userAudioBuffer = payload.audioBuffer;
    },
    resetBlobAndAudioBuffer: (state) => {
      state.blob = null;
      state.userAudioBuffer = null;
    },

    resetUserAudioBuffer: (state) => {
      state.userAudioBuffer = null;
    },
  },
});

export const audioActions = audioSlice.actions;

export default audioSlice.reducer;
