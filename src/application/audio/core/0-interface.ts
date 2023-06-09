export interface ISchedule {
  offset: number;
  start: number;
  stop: number;
}

export interface IAudio {
  chenVoice: null | AudioBuffer;
  recordedVoice: null | AudioBuffer;
  audioContext: null | AudioContext;
  audioBuffers: { [path: string]: AudioBuffer };
}
