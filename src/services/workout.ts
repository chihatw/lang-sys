import { Workout } from '../Model';
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
import { RhythmKanaFormState } from '../pages/Workout/WorkoutEditPage/Model';
import { TYPE } from '../pages/Workout/commons';

const COLLECTIONS = {
  [TYPE.kana]: 'kanaWorkouts',
  [TYPE.pitch]: 'pitchWorkouts',
  [TYPE.rhythm]: 'rhythmWorkouts',
  [TYPE.pitchInput]: 'pitchInputWorkouts',
};

export const getWorkouts = async ({
  type,
  uid,
  max,
  isActiveOnly,
}: {
  type: string;
  uid?: string;
  max?: number;
  isActiveOnly?: boolean;
}) => {
  /** isActiveOnly の未定義処理 */
  typeof isActiveOnly === 'undefined' && (isActiveOnly = true);

  const workouts: { [id: string]: Workout } = {};
  let q = query(collection(db, COLLECTIONS[type]));
  q = query(q, orderBy('createdAt', 'desc'));

  !!max && (q = query(q, limit(max)));
  !!uid && (q = query(q, where('uid', '==', uid)));
  !!isActiveOnly && (q = query(q, where('isActive', '==', true)));

  console.log(`get ${COLLECTIONS[type]}`);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    workouts[doc.id] = buildWorkout(doc);
  });
  return workouts;
};

export const setWorkout = (type: string, workout: Workout) => {
  console.log(`set ${COLLECTIONS[type]}`);
  const { id, ...omitted } = workout;
  setDoc(doc(db, COLLECTIONS[type], id), { ...omitted });
};

export const buildRhythmKanaForm = (
  workout: Workout,
  cueIdsStr: string
): RhythmKanaFormState => {
  return {
    uid: workout.uid,
    title: workout.title,
    isActive: workout.isActive,
    isLocked: workout.isLocked,
    cueIdsStr,
  };
};

const buildWorkout = (doc: DocumentData): Workout => {
  const { uid, cueIds, title, logs, isActive, createdAt, isLocked, kanas } =
    doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    logs: logs || {},
    title: title || '',
    kanas: kanas || [],
    cueIds: cueIds || [],
    isActive: isActive || false,
    isLocked: isLocked ?? true,
    createdAt: createdAt || 0,
  };
};
