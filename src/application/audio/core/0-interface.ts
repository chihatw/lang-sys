export interface IAudio {
  chenVoice: null | AudioBuffer;
  audioContext: null | AudioContext;
  audioBuffers: { [path: string]: AudioBuffer };
}
