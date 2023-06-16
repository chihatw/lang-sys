export interface IAudio {
  chenVoice: null | AudioBuffer;
  chenVoice2: null | AudioBuffer;
  recordedBlob: null | Blob;
  recordedAudioBuffer: null | AudioBuffer;
  fetchedAudioBuffers: { [path: string]: AudioBuffer };
}
