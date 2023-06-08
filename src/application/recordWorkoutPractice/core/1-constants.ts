import { SCENE } from '../../../views/pages/Workout/commons';

import { initialWorkoutLog } from '../../workoutLog/core/1-constants';
import { IRecordWorkoutPractice } from './0-interface';

export const initialState: IRecordWorkoutPractice = {
  log: initialWorkoutLog,
  scene: SCENE.opening,
  workoutId: '',
  audioBuffer: null,
  currentIndex: 0,
  shuffledCueIds: [],
};
