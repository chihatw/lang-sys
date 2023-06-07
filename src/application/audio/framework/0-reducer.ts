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
  },
});

export const audioActions = audioSlice.actions;

export default audioSlice.reducer;
