import { IRecordWorkout } from './0-interface';

export const initialRecordWorkout: IRecordWorkout = {
  id: '',
  uid: '',
  cueIds: [],
  title: '',
  logs: {},
  createdAt: 0,
};

export const initialState: { [id: string]: IRecordWorkout } = {};
