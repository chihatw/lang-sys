import { IWorkoutLog } from '../../workoutLog/core/0-interface';

export interface IRecordWorkoutPractice {
  log: IWorkoutLog;
  scene: string;
  workoutId: string;
  audioBuffer: AudioBuffer | null;
  currentIndex: number;
  shuffledCueIds: string[];
}
