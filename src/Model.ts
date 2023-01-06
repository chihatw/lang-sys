import { User } from '@firebase/auth';

export type Schedule = { offset: number; start: number; stop: number };

export type KanaCue = {
  id: string;
  end: number;
  start: number;
  hira: string;
  kata: string;
};

export type PitchCue = {
  id: string;
  end: number;
  start: number;
  pitchStr: string;
};

export type WorkoutLog = {
  id: string;
  kanas: string[];
  cueIds: string[];
  createdAt: number;
  opening: {
    tapped: string[];
  };
  practice: {
    answers: {
      [index: number]: {
        createdAt: number;
        playedAt: number[];
        selected: string;
      };
    };
  };
  result: {
    createdAt: number;
    tapped: string[];
  };
};

export const INITIAL_WORKOUT_LOG: WorkoutLog = {
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
  logs: { [id: string]: WorkoutLog };
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
  user: User | null;
  audioBuffers: { [path: string]: AudioBuffer };
  audioContext: AudioContext | null;
  kanaWorkouts: { [id: string]: Workout };
  pitchWorkouts: { [id: string]: Workout };
  rhythmWorkouts: { [id: string]: Workout };
  recordWorkouts: { [id: string]: Workout };
  authInitializing: boolean;
  pitchInputWorkouts: { [id: string]: Workout };
  admin: {
    kanaWorkouts: { [id: string]: Workout };
    pitchWorkouts: { [id: string]: Workout };
    rhythmWorkouts: { [id: string]: Workout };
    recordWorkouts: { [id: string]: Workout };
    pitchInputWorkouts: { [id: string]: Workout };
  };
};

export const INITIAL_STATE: State = {
  user: null,
  audioBuffers: {},
  audioContext: null,
  kanaWorkouts: {},
  pitchWorkouts: {},
  rhythmWorkouts: {},
  recordWorkouts: {},
  authInitializing: true,
  pitchInputWorkouts: {},
  admin: {
    kanaWorkouts: {},
    pitchWorkouts: {},
    rhythmWorkouts: {},
    recordWorkouts: {},
    pitchInputWorkouts: {},
  },
};
