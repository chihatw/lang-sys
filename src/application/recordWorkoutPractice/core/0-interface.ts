export interface IRecordWorkoutPractice {
  scene: string;
  isRunning: boolean;
  workoutId: string;
  audioBuffer: AudioBuffer | null; // play用
  currentIndex: number;
  shuffledCueIds: string[];
}
