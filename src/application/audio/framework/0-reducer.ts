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
    setBlob: (state, { payload }: { payload: Blob }) => {
      state.blob = payload;
    },
    resetBlob: (state) => {
      state.blob = null;
    },
  },
});

export const audioActions = audioSlice.actions;

export default audioSlice.reducer;
