export interface IAudio {
  blob: null | Blob;
  chenVoice: null | AudioBuffer;
  recordedVoice: null | AudioBuffer;
  fetchedAudioBuffers: { [path: string]: AudioBuffer };
}
