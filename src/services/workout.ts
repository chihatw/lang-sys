import * as R from 'ramda';
import { INITIAL_WORKOUT, State, Workout } from '../Model';
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
  getDoc,
} from 'firebase/firestore';
import { db } from '../repositories/firebase';
import { RhythmKanaFormState } from '../pages/Workout/WorkoutEditPage/Model';
import {
  workoutsSwitch,
  TYPE,
  workoutPropSwitch,
} from '../pages/Workout/commons';
import { Dispatch, useEffect, useState } from 'react';
import { Action, ActionTypes } from '../Update';

const COLLECTIONS = {
  [TYPE.kana]: 'kanaWorkouts',
  [TYPE.pitch]: 'pitchWorkouts',
  [TYPE.rhythm]: 'rhythmWorkouts',
  [TYPE.record]: 'recordWorkouts',
  [TYPE.pitchInput]: 'pitchInputWorkouts',
};

export const useWorkout = (
  workoutId: string | undefined,
  state: State,
  dispatch: Dispatch<Action>,
  type: string
) => {
  const [workout, setWorkout] = useState(INITIAL_WORKOUT);

  /** 代入 */
  useEffect(() => {
    if (!workoutId) return;
    const workouts = workoutsSwitch(state, type);
    const workout = workouts[workoutId];
    if (!workout) return;
    setWorkout(workout);
  }, [
    workoutId,
    state.kanaWorkouts,
    state.pitchWorkouts,
    state.rhythmWorkouts,
    state.recordWorkouts,
    state.pitchInputWorkouts,
  ]);

  /** state.*Workouts の更新 */
  useEffect(() => {
    if (!workoutId) return;
    const workouts = workoutsSwitch(state, type);
    const workout = workouts[workoutId];
    // ローカルにあれば、終了
    if (!!workout) return;

    // ローカルにない場合
    const fetchData = async () => {
      const workout = await getWorkout(workoutId, type);
      if (!workout.id) return;
      const workoutProp = workoutPropSwitch(type);
      if (!workoutProp) return;
      const updatedState = R.assocPath<Workout, State>(
        [workoutProp, workout.id],
        workout
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [
    workoutId,
    state.kanaWorkouts,
    state.pitchWorkouts,
    state.rhythmWorkouts,
    state.recordWorkouts,
    state.pitchInputWorkouts,
  ]);

  return workout;
};

export const useUserWorkouts = (
  uid: string,
  state: State,
  dispatch: Dispatch<Action>,
  type: string | undefined
) => {
  const [workouts, setWorkous] = useState<{ [id: string]: Workout }>({});

  /** 代入 */
  useEffect(() => {
    if (!type) return;
    const workouts = workoutsSwitch(state, type);
    if (!Object.keys(workouts).length) return;
    setWorkous(workouts);
  }, [
    type,
    state.kanaWorkouts,
    state.pitchWorkouts,
    state.rhythmWorkouts,
    state.recordWorkouts,
    state.pitchInputWorkouts,
  ]);

  /** state.*Workouts の更新 */
  useEffect(() => {
    if (!uid || !type) return;

    // ローカルにある場合、終了
    const workouts = workoutsSwitch(state, type);
    if (!!Object.keys(workouts).length) return;

    // ローカルにない場合は、リモートから取得
    const fetchData = async () => {
      updateState_by_fetch_workouts(uid, state, dispatch, type);
    };
    fetchData();
  }, [uid]);

  return { workouts };
};

export const getWorkout = async (id: string, type: string) => {
  console.log(`get ${COLLECTIONS[type]}`);
  const docSnapshot = await getDoc(doc(db, COLLECTIONS[type], id));
  if (!docSnapshot.exists()) return INITIAL_WORKOUT;
  const workout = buildWorkout(docSnapshot);
  return workout;
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
    cueIdsStr,
  };
};

const buildWorkout = (doc: DocumentData): Workout => {
  const { uid, cueIds, title, logs, isActive, createdAt, kanas } = doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    logs: logs || {},
    title: title || '',
    kanas: kanas || [],
    cueIds: cueIds || [],
    isActive: isActive || false,
    createdAt: createdAt || 0,
  };
};

const updateState_by_fetch_workouts = async (
  uid: string,
  state: State,
  dispatch: Dispatch<Action>,
  type: string
) => {
  const workouts = await getWorkouts({ type, uid });

  if (!Object.keys(workouts).length) return;

  const workoutProp = workoutPropSwitch(type);
  if (!workoutProp) return;

  const updatedState = R.assocPath<{ [id: string]: Workout }, State>(
    [workoutProp],
    workouts
  )(state);
  dispatch({ type: ActionTypes.setState, payload: updatedState });
};
