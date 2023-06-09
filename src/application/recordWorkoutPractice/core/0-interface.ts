import { IWorkoutLog } from '../../workoutLog/core/0-interface';

export interface IRecordWorkoutPractice {
  blob: Blob | null;
  scene: string;
  isRunning: boolean;
  workoutId: string;
  isChecking: boolean;
  audioBuffer: AudioBuffer | null;
  currentIndex: number;
  shuffledCueIds: string[];
}
