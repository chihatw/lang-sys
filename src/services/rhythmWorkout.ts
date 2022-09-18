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

const COLLECTION = 'rhythmWorkouts';

export const getRhythmWorkouts = async ({
  uid,
  max,
  isActiveOnly,
}: {
  uid?: string;
  max?: number;
  isActiveOnly?: boolean;
}) => {
  typeof isActiveOnly === 'undefined' && (isActiveOnly = true);
  const rhythmWorkouts: { [id: string]: RhythmWorkout } = {};
  let q = query(collection(db, COLLECTION));
  q = query(q, orderBy('createdAt', 'desc'));
  !!max && (q = query(q, limit(max)));
  !!uid && (q = query(q, where('uid', '==', uid)));
  !!isActiveOnly && (q = query(q, where('isActive', '==', true)));

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

export const buildRhythmKanaFormRhythmWorkout = (
  workout: RhythmWorkout
): RhythmKanaFormState => {
  return {
    uid: workout.uid,
    title: workout.title,
    isActive: workout.isActive,
    isLocked: workout.isLocked,
    cueIdsStr: workout.cueIds.join('\n'),
  };
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
