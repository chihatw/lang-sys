import { db } from '../../../repositories/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { initialState } from '../../recordWorkouts/core/1-constants';
import { buildWorkout } from '../../recordWorkoutList/infrastructure/api';

const COLLECTION = 'recordWorkouts';

export const fetchRecordWorkout = async (id: string) => {
  const docSnapshot = await getDoc(doc(db, COLLECTION, id));
  if (!docSnapshot.exists()) return initialState;
  const workout = buildWorkout(docSnapshot);
  return workout;
};
