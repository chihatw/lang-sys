export interface IRecordWorkoutPractice {
  blob: Blob | null; // upload用
  scene: string;
  isRunning: boolean;
  workoutId: string;
  audioBuffer: AudioBuffer | null; // play用
  currentIndex: number;
  shuffledCueIds: string[];
}
