import { IAudio } from './0-interface';

export const initialState: IAudio = {
  chenVoice: null,
  recordedVoice: null,
  audioContext: null,
  audioBuffers: {},
};
