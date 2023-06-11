import { IRecordWorkoutPractice } from './0-interface';

export const SCENE = {
  check: 'check',
  opening: 'opening',
  practice: 'practice',
};

export const initialState: IRecordWorkoutPractice = {
  scene: SCENE.opening,
  workoutId: '',
  isRunning: false,
  currentIndex: 0,
  shuffledCueIds: [],
};
