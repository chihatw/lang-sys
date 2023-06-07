import { IWorkoutLog } from '../../workoutLog/core/0-interface';

export interface IRecordWorkout {
  id: string;
  uid: string;
  cueIds: string[];
  title: string;
  logs: { [id: string]: IWorkoutLog };
  createdAt: number;
}

export interface IRecordWorkouts {
  workouts: { [id: string]: IRecordWorkout };
  audioBuffers: { [id: string]: AudioBuffer };
  isFetching: boolean;
  errorMsg: string;
}
