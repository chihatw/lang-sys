import { IAudio } from 'application/audio/core/0-interface';

export const initialState: IAudio = {
  recordedBlob: null,
  recordedAudioBuffer: null,
  fetchedAudioBuffers: {},
};
