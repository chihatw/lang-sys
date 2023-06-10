export interface IAudio {
  chenVoice: null | AudioBuffer;
  recordedVoice: null | AudioBuffer;
  fetchedAudioBuffers: { [path: string]: AudioBuffer };
}
