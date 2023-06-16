import { IAudio } from 'application/audio/core/0-interface';

export const initialState: IAudio = {
  chenVoice: null,
  chenVoice2: null,
  recordedBlob: null,
  recordedAudioBuffer: null,
  fetchedAudioBuffers: {},
};
