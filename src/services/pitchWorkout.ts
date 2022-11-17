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
  limit,
} from 'firebase/firestore';
import { db } from '../repositories/firebase';
import { RhythmKanaFormState } from '../pages/Workout/RhythmKanaEditPage/Model';
import { buildRhythmWorkout } from './rhythmWorkout';

const COLLECTION = 'pitchWorkouts';

export const getPitchWorkouts = async ({
  uid,
  max,
  isActiveOnly,
}: {
  uid?: string;
  max?: number;
  isActiveOnly?: boolean;
}) => {
  /** isActiveOnly の未定義処理 */
  typeof isActiveOnly === 'undefined' && (isActiveOnly = true);

  const pitchWorkouts: { [id: string]: RhythmWorkout } = {};
  let q = query(collection(db, COLLECTION));
  q = query(q, orderBy('createdAt', 'desc'));
  !!max && (q = query(q, limit(max)));
  !!uid && (q = query(q, where('uid', '==', uid)));
  !!isActiveOnly && (q = query(q, where('isActive', '==', true)));

  console.log('get pitchWorkouts');
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    pitchWorkouts[doc.id] = buildRhythmWorkout(doc);
  });
  return pitchWorkouts;
};
