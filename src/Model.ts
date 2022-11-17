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

export type RhythmWorkoutLog = {
  id: string;
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

export type KanaWorkoutLog = {
  id: string;
  kanas: string[];
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

export const INITIAL_KANA_WORKOUT_LOG: KanaWorkoutLog = {
  id: '',
  kanas: [],
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

export const INITIAL_RHYTHM_WORKOUT_LOG: RhythmWorkoutLog = {
  id: '',
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

export type RhythmWorkout = {
  id: string;
  uid: string;
  cueIds: string[];
  title: string;
  logs: { [id: string]: RhythmWorkoutLog };
  isActive: boolean;
  createdAt: number;
  isLocked: boolean;
};

export const INITIAL_RHYTHM_WORKOUT: RhythmWorkout = {
  id: '',
  uid: '',
  cueIds: [],
  title: '',
  logs: {},
  isActive: false,
  createdAt: 0,
  isLocked: false,
};

export type KanaWorkout = {
  id: string;
  uid: string;
  kanas: string[];
  title: string;
  logs: { [id: string]: KanaWorkoutLog };
  isActive: boolean;
  createdAt: number;
  isLocked: boolean;
};

export const INITIAL_KANA_WORKOUT: KanaWorkout = {
  id: '',
  uid: '',
  kanas: [],
  title: '',
  logs: {},
  isActive: false,
  createdAt: 0,
  isLocked: false,
};

export type State = {
  user: User | null;
  kanaWorkouts: { [id: string]: KanaWorkout };
  pitchWorkouts: { [id: string]: RhythmWorkout };
  rhythmWorkouts: { [id: string]: RhythmWorkout };
  authInitializing: boolean;
  audioContext: AudioContext | null;
  blobs: { [downloadURL: string]: Blob };
  admin: {
    kanaWorkouts: { [id: string]: KanaWorkout };
    pitchWorkouts: { [id: string]: RhythmWorkout };
    rhythmWorkouts: { [id: string]: RhythmWorkout };
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
