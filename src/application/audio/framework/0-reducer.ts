import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    mergeFetchedAudioBuffers: (
      state,
      { payload }: { payload: { [path: string]: AudioBuffer } }
    ) => {
      state.fetchedAudioBuffers = { ...state.fetchedAudioBuffers, ...payload };
    },
    saveAudioBuffer: (
      state,
      { payload }: { payload: { path: string; audioBuffer: AudioBuffer } }
    ) => {
      state.fetchedAudioBuffers = {
        ...state.fetchedAudioBuffers,
        [payload.path]: payload.audioBuffer,
      };
    },
    removeFetchedAudioBuffer: (state, { payload }: { payload: string }) => {
      const fetchedAudioBuffers = { ...state.fetchedAudioBuffers };
      delete fetchedAudioBuffers[payload];
      state.fetchedAudioBuffers = fetchedAudioBuffers;
    },
    setBlobAndAudioBuffer: (
      state,
      {
        payload: { recordedBlob, recordedAudioBuffer },
      }: { payload: { recordedBlob: Blob; recordedAudioBuffer: AudioBuffer } }
    ) => {
      state.recordedBlob = recordedBlob;
      state.recordedAudioBuffer = recordedAudioBuffer;
    },
    resetBlobAndAudioBuffer: (state) => {
      state.recordedBlob = null;
      state.recordedAudioBuffer = null;
    },
  },
});

export const audioActions = audioSlice.actions;

export default audioSlice.reducer;
