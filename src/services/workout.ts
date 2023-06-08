import { Workout } from '../Model';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../repositories/firebase';
import { IRecordWorkout } from '../application/recordWorkouts/core/0-interface';

// debug delete this file
// todo duplicate
const TYPE = {
  kana: 'kana',
  pitch: 'pitch',
  rhythm: 'rhythm',
  record: 'record',
  pitchInput: 'pitchInput',
  chineseCue: 'chineseCue',
};

export const setWorkout = (workout: IRecordWorkout) => {
  console.log(`set recordWorkouts`);
  const { id, ...omitted } = workout;
  setDoc(doc(db, 'recordWorkouts', id), { ...omitted });
};
