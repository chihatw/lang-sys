export interface IAudio {
  audioContext: null | AudioContext;
  audioBuffers: { [path: string]: AudioBuffer };
}
