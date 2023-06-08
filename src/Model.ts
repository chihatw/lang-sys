import { IWorkoutLog } from './application/workoutLog/core/0-interface';

export type Schedule = { offset: number; start: number; stop: number };

export const INITIAL_WORKOUT_LOG: IWorkoutLog = {
  id: '',
  kanas: [],
  cueIds: [],
  createdAt: 0,
  opening: {
    tapped: [],
  },
  practice: {
    answers: {},
  },
  result: {
    createdAt: 0,
    tapped: [],
  },
};

export type Workout = {
  id: string;
  uid: string;
  kanas: string[];
  cueIds: string[];
  title: string;
  logs: { [id: string]: IWorkoutLog };
  isActive: boolean;
  createdAt: number;
};

export const INITIAL_WORKOUT: Workout = {
  id: '',
  uid: '',
  kanas: [],
  cueIds: [],
  title: '',
  logs: {},
  isActive: false,
  createdAt: 0,
};

export type State = {
  audioBuffers: { [path: string]: AudioBuffer };
  // kanaWorkouts: { [id: string]: Workout };
  // pitchWorkouts: { [id: string]: Workout };
  // rhythmWorkouts: { [id: string]: Workout };
  recordWorkouts: { [id: string]: Workout };
  chineseCueWorkouts: { [id: string]: Workout };
  // pitchInputWorkouts: { [id: string]: Workout };
};

export const INITIAL_STATE: State = {
  audioBuffers: {},
  // kanaWorkouts: {},
  // pitchWorkouts: {},
  // rhythmWorkouts: {},
  recordWorkouts: {},
  // pitchInputWorkouts: {},
  chineseCueWorkouts: {},
};
