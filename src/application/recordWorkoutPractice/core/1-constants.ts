import { SCENE } from '../../../views/pages/Workout/commons';

import { initialWorkoutLog } from '../../workoutLog/core/1-constants';
import { IRecordWorkoutPractice } from './0-interface';
import { initialRecordWorkout } from '../../recordWorkouts/core/1-constants';

export const initialState: IRecordWorkoutPractice = {
  log: initialWorkoutLog,
  scene: SCENE.opening,
  workout: initialRecordWorkout,
  audioBuffer: null,
  currentIndex: 0,
  shuffledCueIds: [],
  recordedAudioBuffer: null,
};
