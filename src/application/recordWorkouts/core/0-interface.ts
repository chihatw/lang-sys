export interface IRecordWorkout {
  id: string;
  uid: string;
  cueIds: string[]; // pitchStr 直接入力
  title: string;
  createdAt: number;
}
