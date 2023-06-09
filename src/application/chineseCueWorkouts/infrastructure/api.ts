import { db } from '../../../infrastructure/firebase';
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
import { IChineseCueWorkout } from '../core/0-interface';

const COLLECTION = 'chineseCueWorkouts';

export const fetchWorkout = async (id: string) => {
  const docSnapshot = await getDoc(doc(db, COLLECTION, id));
  if (!docSnapshot.exists()) return null;
  const workout = buildWorkout(docSnapshot);
  return workout;
};

export const fetchWorkouts = async (uid: string) => {
  let q = query(collection(db, COLLECTION));
  q = query(q, where('uid', '==', uid));
  q = query(q, where('isActive', '==', true));
  q = query(q, orderBy('createdAt', 'desc'));

  console.log(`%cfetch ${COLLECTION}`, 'color:red');

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
