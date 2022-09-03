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

export type TapLog = {
  tapped: { [index: number]: string };
  duration: number;
};

export type RhythmWorkoutLog = {
  id: string;
  cueIds: string[];
  createdAt: number;
  removedAt: number;
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

export const INITIAL_RHYTHM_WORKOUT_LOG: RhythmWorkoutLog = {
  id: '',
  cueIds: [],
  createdAt: 0,
  removedAt: 0,
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
  storagePath: string;
};

export type State = {
  user: User | null;
  rhythmWorkouts: { [id: string]: RhythmWorkout };
  authInitializing: boolean;
  audioContext: AudioContext | null;
  blobs: { [downloadURL: string]: Blob };
};

export const INITIAL_STATE: State = {
  user: null,
  blobs: {},
  audioContext: null,
  rhythmWorkouts: {},
  authInitializing: true,
};
