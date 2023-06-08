import { IRecordWorkoutList } from './0-interface';

export const initialState: IRecordWorkoutList = {
  workouts: {},
  audioBuffers: {},
  isFetching: false,
  errorMsg: '',
};
