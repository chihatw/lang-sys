import { IAudio } from 'application/audio/core/0-interface';

export const initialState: IAudio = {
  blob: null,
  chenVoice: null,
  recordedVoice: null,
  userAudioBuffer: null,
  fetchedAudioBuffers: {},
};
