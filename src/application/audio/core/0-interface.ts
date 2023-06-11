export interface IAudio {
  blob: null | Blob;
  chenVoice: null | AudioBuffer;
  recordedVoice: null | AudioBuffer;
  userAudioBuffer: null | AudioBuffer;
  fetchedAudioBuffers: { [path: string]: AudioBuffer };
}
