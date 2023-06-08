import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudioContext: (state, { payload }: { payload: AudioContext }) => {
      state.audioContext = payload;
    },
    removeAudioContext: (state) => {
      state.audioContext = null;
    },
    setAudioBuffers: (
      state,
      { payload }: { payload: { [path: string]: AudioBuffer } }
    ) => {
      state.audioBuffers = { ...state.audioBuffers, ...payload };
    },
    removeAudioBuffer: (state, { payload }: { payload: string }) => {
      const audioBuffers = { ...state.audioBuffers };
      delete audioBuffers[payload];
      state.audioBuffers = audioBuffers;
    },
  },
});

export const audioActions = audioSlice.actions;

export default audioSlice.reducer;
