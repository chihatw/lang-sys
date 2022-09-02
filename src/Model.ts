import { User } from '@firebase/auth';

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

export type RhythmWorkoutAnswer = {
  logs: { [index: number]: TapLog };
  cueIds: string[];
  duration: number;
  createdAt: number;
  correctRatio: number;
};

export type RhythmWorkout = {
  id: string;
  uid: string;
  cues: { [id: string]: PitchCue };
  title: string;
  answers: { [createdAt: number]: RhythmWorkoutAnswer };
  // roundCount:number 今後
  isActive: boolean;
  createdAt: number;
  storagePath: string;
};

export type State = {
  user: User | null;
  rhythmWorkouts: { [id: string]: RhythmWorkout };
  authInitializing: boolean;
};
