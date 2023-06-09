import { IChineseCueWorkoutPractice } from './0-interface';

export const SCENE = {
  check: 'check',
  opening: 'opening',
  practice: 'practice',
};

export const initialState: IChineseCueWorkoutPractice = {
  blob: null,
  scene: SCENE.opening,
  workoutId: '',
  isRunning: false,
  audioBuffer: null,
  currentIndex: 0,
  shuffledCueIds: [],
};
