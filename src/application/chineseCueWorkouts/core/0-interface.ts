export interface IChineseCueWorkout {
  id: string;
  uid: string;
  cueIds: string[]; // RECORDED_VOICES の id
  title: string;
  createdAt: number;
}
