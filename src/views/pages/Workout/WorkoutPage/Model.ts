import { INITIAL_WORKOUT, INITIAL_WORKOUT_LOG } from '../../../../Model';
import { IRecordWorkout } from '../../../../application/recordWorkouts/core/0-interface';
import { IWorkoutLog } from '../../../../application/workoutLog/core/0-interface';

import { SCENE } from '../commons';

export type WorkoutState = {
  id: string;
  log: IWorkoutLog;
  cues: { id: string; pitchStr: string }[];
  scene: string;
  workout: IRecordWorkout;
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
