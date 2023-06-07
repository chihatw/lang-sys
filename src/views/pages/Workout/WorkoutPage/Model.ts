import {
  INITIAL_WORKOUT,
  INITIAL_WORKOUT_LOG,
  Workout,
} from '../../../../Model';
import { IWorkoutLog } from '../../../../application/workoutLog/core/0-interface';

import { SCENE } from '../commons';

export type WorkoutState = {
  id: string;
  log: IWorkoutLog;
  cues: { id: string; pitchStr: string }[];
  scene: string;
  workout: Workout;
  audioBuffer: AudioBuffer | null;
  currentIndex: number;
};

export const INITIAL_WORKOUT_STATE: WorkoutState = {
  id: '',
  log: INITIAL_WORKOUT_LOG,
  cues: [],
  scene: SCENE.opening,
  workout: INITIAL_WORKOUT,
  audioBuffer: null,
  currentIndex: 0,
};
