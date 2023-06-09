import { IRecordWorkoutPractice } from './0-interface';

export const SCENE = {
  opening: 'opening',
  practice: 'practice',
};

export const initialState: IRecordWorkoutPractice = {
  blob: null,
  scene: SCENE.opening,
  workoutId: '',
  isRunning: false,
  isChecking: false, // scene と統一？
  audioBuffer: null,
  currentIndex: 0,
  shuffledCueIds: [],
};
