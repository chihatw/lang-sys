export interface IAudio {
  recordedBlob: null | Blob;
  recordedAudioBuffer: null | AudioBuffer;
  fetchedAudioBuffers: { [path: string]: AudioBuffer };
}
