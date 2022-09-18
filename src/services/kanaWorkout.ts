import { KanaWorkout, State } from '../Model';
import {
  query,
  where,
  getDocs,
  orderBy,
  collection,
  DocumentData,
  setDoc,
  doc,
  limit,
} from 'firebase/firestore';
import { db } from '../repositories/firebase';
import { RhythmKanaFormState } from '../pages/Workout/RhythmKanaEditPage/Model';

const COLLECTION = 'kanaWorkouts';

export const getKanaWorkouts = async (
  {
    uid,
    max,
    isActiveOnly,
  }: {
    uid?: string;
    max?: number;
    isActiveOnly?: boolean;
  } = { uid: '', max: 0, isActiveOnly: true }
) => {
  const kanaWorkouts: { [id: string]: KanaWorkout } = {};
  let q = query(collection(db, COLLECTION));
  q = query(q, orderBy('createdAt', 'desc'));

  !!max && (q = query(q, limit(max)));
  !!uid && (q = query(q, where('uid', '==', uid)));
  !!isActiveOnly && (q = query(q, where('isActive', '==', true)));

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

export const buildRhythmKanaFormKanaWorkout = (
  workout: KanaWorkout
): RhythmKanaFormState => {
  return {
    uid: workout.uid,
    title: workout.title,
    isActive: workout.isActive,
    isLocked: workout.isLocked,
    cueIdsStr: workout.kanas.join('\n'),
  };
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
