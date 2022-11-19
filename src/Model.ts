import { User } from '@firebase/auth';

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
  isLocked: boolean;
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
  isLocked: false,
};

export type State = {
  user: User | null;
  kanaWorkouts: { [id: string]: Workout };
  pitchWorkouts: { [id: string]: Workout };
  rhythmWorkouts: { [id: string]: Workout };
  authInitializing: boolean;
  audioContext: AudioContext | null;
  blobs: { [downloadURL: string]: Blob };
  admin: {
    kanaWorkouts: { [id: string]: Workout };
    pitchWorkouts: { [id: string]: Workout };
    rhythmWorkouts: { [id: string]: Workout };
  };
};

export const INITIAL_STATE: State = {
  user: null,
  blobs: {},
  audioContext: null,
  kanaWorkouts: {},
  pitchWorkouts: {},
  rhythmWorkouts: {},
  authInitializing: true,
  admin: {
    kanaWorkouts: {},
    pitchWorkouts: {},
    rhythmWorkouts: {},
  },
};
