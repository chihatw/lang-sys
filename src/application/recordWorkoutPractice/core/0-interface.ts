import { IRecordWorkout } from '../../recordWorkouts/core/0-interface';
import { IWorkoutLog } from '../../workoutLog/core/0-interface';

export interface IRecordWorkoutPractice {
  log: IWorkoutLog;
  scene: string;
  workout: IRecordWorkout;
  audioBuffer: AudioBuffer | null;
  currentIndex: number;
  shuffledCueIds: string[];
  recordedAudioBuffer: AudioBuffer | null;
}
