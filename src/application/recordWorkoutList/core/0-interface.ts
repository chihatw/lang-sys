export interface IRecordWorkoutList {
  workoutIds: string[];
  audioBuffers: { [id: string]: AudioBuffer };
  isFetching: boolean;
  errorMsg: string;
}
