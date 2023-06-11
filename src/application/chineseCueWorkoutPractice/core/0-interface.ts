export interface IChineseCueWorkoutPractice {
  scene: string;
  isRunning: boolean;
  workoutId: string;
  audioBuffer: AudioBuffer | null; // play用
  currentIndex: number;
  shuffledCueIds: string[];
}
