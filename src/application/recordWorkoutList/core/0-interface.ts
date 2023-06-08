import { IRecordWorkout } from '../../recordWorkouts/core/0-interface';

export interface IRecordWorkoutList {
  workouts: { [id: string]: IRecordWorkout };
  audioBuffers: { [id: string]: AudioBuffer };
  isFetching: boolean;
  errorMsg: string;
}
