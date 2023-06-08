import { db } from '../../../repositories/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { IRecordWorkout } from '../core/0-interface';
const COLLECTION = 'recordWorkouts';

export const fetchWorkouts = async (uid: string) => {
  let q = query(collection(db, COLLECTION));
  q = query(q, where('uid', '==', uid));
  q = query(q, where('isActive', '==', true));
  q = query(q, orderBy('createdAt', 'desc'));

  console.log(`%cfetch ${COLLECTION}`, 'color:red');

  const querySnapshot = await getDocs(q);
  const workouts: { [id: string]: IRecordWorkout } = {};
  querySnapshot.forEach((doc) => {
    const workout = buildWorkout(doc);
    workouts[doc.id] = workout;
  });
  return workouts;
};

const buildWorkout = (doc: DocumentData): IRecordWorkout => {
  const { uid, cueIds, title, logs, createdAt } = doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    logs: logs || {},
    title: title || '',
    cueIds: cueIds || [],
    createdAt: createdAt || 0,
  };
};
