import { KanaWorkout, RhythmWorkout } from '../Model';
import {
  query,
  where,
  getDocs,
  orderBy,
  collection,
  DocumentData,
  setDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../repositories/firebase';

const COLLECTION = 'kanaWorkouts';

export const getKanaWorkouts = async (uid: string) => {
  const kanaWorkouts: { [id: string]: KanaWorkout } = {};
  const q = query(
    collection(db, COLLECTION),
    where('uid', '==', uid),
    where('isActive', '==', true),
    orderBy('createdAt')
  );
  console.log('get kanaWorkouts');
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    kanaWorkouts[doc.id] = buildKanaWorkout(doc);
  });
  return kanaWorkouts;
};

export const setKanaWorkout = (workout: KanaWorkout) => {
  console.log('set kanaWorkout');
  const { id, ...omitted } = workout;
  setDoc(doc(db, COLLECTION, id), { ...omitted });
};

const buildKanaWorkout = (doc: DocumentData): KanaWorkout => {
  const { uid, kanas, title, logs, isActive, createdAt, isLocked } = doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    logs: logs || {},
    title: title || '',
    kanas: kanas || [],
    isActive: isActive || false,
    isLocked: isLocked ?? true,
    createdAt: createdAt || 0,
  };
};
