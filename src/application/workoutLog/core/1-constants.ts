import { IWorkoutLog } from './0-interface';

export const initialWorkoutLog: IWorkoutLog = {
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
