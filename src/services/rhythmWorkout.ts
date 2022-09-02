import { RhythmWorkout } from '../Model';
import {
  query,
  where,
  getDocs,
  orderBy,
  collection,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../repositories/firebase';

const COLLECTION = 'rhythmWorkouts';

export const getRhythmWorkouts = async (uid: string) => {
  const rhythmWorkouts: { [id: string]: RhythmWorkout } = {};
  const q = query(
    collection(db, COLLECTION),
    where('uid', '==', uid),
    orderBy('createdAt')
  );
  console.log('get rhythmWorkouts');
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    rhythmWorkouts[doc.id] = buildRhythmWorkout(doc);
  });
  return rhythmWorkouts;
};

const buildRhythmWorkout = (doc: DocumentData): RhythmWorkout => {
  const { uid, cues, title, answers, isActive, createdAt, storagePath } =
    doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    cues: cues || {},
    title: title || '',
    answers: answers || {},
    isActive: isActive || false,
    createdAt: createdAt || 0,
    storagePath: storagePath || '',
  };
};
