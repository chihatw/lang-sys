import {
  DocumentData,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { IChineseCueWorkout } from '../core/0-interface';
import { CHINESE_CUE_WORKOUT_STORE_COLLECTION } from '../core/1-constants';

export const fetchWorkout = async (id: string) => {
  console.log(`%cfetch ${CHINESE_CUE_WORKOUT_STORE_COLLECTION}`, 'color:red');

  const docSnapshot = await getDoc(
    doc(db, CHINESE_CUE_WORKOUT_STORE_COLLECTION, id)
  );
  if (!docSnapshot.exists()) return null;
  const workout = buildWorkout(docSnapshot);
  return workout;
};

export const fetchWorkouts = async (uid: string) => {
  console.log(`%cfetch ${CHINESE_CUE_WORKOUT_STORE_COLLECTION}`, 'color:red');

  let q = query(collection(db, CHINESE_CUE_WORKOUT_STORE_COLLECTION));
  q = query(q, where('uid', '==', uid));
  q = query(q, where('isActive', '==', true));
  q = query(q, orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(q);
  const workouts: { [id: string]: IChineseCueWorkout } = {};
  querySnapshot.forEach((doc) => {
    const workout = buildWorkout(doc);
    workouts[doc.id] = workout;
  });
  return workouts;
};

const buildWorkout = (doc: DocumentData): IChineseCueWorkout => {
  const { uid, cueIds, title, createdAt } = doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    title: title || '',
    cueIds: cueIds || [],
    createdAt: createdAt || 0,
  };
};
