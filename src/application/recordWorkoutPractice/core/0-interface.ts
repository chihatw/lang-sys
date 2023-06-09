export interface IRecordWorkoutPractice {
  blob: Blob | null; // upload用
  scene: string;
  isRunning: boolean;
  workoutId: string;
  isChecking: boolean;
  audioBuffer: AudioBuffer | null; // play用
  currentIndex: number;
  shuffledCueIds: string[];
}
