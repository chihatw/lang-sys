export interface IRecordWorkoutPractice {
  scene: string;
  isRunning: boolean;
  workoutId: string;
  currentIndex: number;
  shuffledCueIds: string[];
}
