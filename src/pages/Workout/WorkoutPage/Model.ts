import {
  INITIAL_WORKOUT,
  INITIAL_WORKOUT_LOG,
  Workout,
  WorkoutLog,
} from '../../../Model';

import { SCENE } from '../commons';

export type WorkoutState = {
  id: string;
  log: WorkoutLog;
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
