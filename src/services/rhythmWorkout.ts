import { RhythmWorkout } from '../Model';
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

const COLLECTION = 'rhythmWorkouts';

export const getRhythmWorkouts = async (uid: string) => {
  const rhythmWorkouts: { [id: string]: RhythmWorkout } = {};
  const q = query(
    collection(db, COLLECTION),
    where('uid', '==', uid),
    where('isActive', '==', true),
    orderBy('createdAt')
  );
  console.log('get rhythmWorkouts');
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    rhythmWorkouts[doc.id] = buildRhythmWorkout(doc);
  });
  return rhythmWorkouts;
};

export const setRhythmWorkout = (workout: RhythmWorkout) => {
  console.log('set rhythmWorkout');
  const { id, ...omitted } = workout;
  setDoc(doc(db, COLLECTION, id), { ...omitted });
};

const buildRhythmWorkout = (doc: DocumentData): RhythmWorkout => {
  const { uid, cueIds, title, logs, isActive, createdAt, isLocked } =
    doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    logs: logs || {},
    title: title || '',
    cueIds: cueIds || [],
    isActive: isActive || false,
    isLocked: isLocked ?? true,
    createdAt: createdAt || 0,
  };
};
