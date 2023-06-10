import { IAudio } from 'application/audio/core/0-interface';

export const initialState: IAudio = {
  chenVoice: null,
  recordedVoice: null,
  fetchedAudioBuffers: {},
};
