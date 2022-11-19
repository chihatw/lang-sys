import * as R from 'ramda';
import { buildKanaCues } from '../../assets/kanas';
import { buildPitchCues } from '../../assets/pitches';
import { State, Workout, WorkoutLog } from '../../Model';
import { setWorkout } from '../../services/rhythmWorkout';
import { WorkoutState } from './WorkoutPage/Model';

export const TYPE = {
  kana: 'kana',
  pitch: 'pitch',
  rhythm: 'rhythm',
};

export const SCENE = {
  opening: 'opening',
  practice: 'practice',
  result: 'result',
};

export const PROP = {
  [TYPE.kana]: 'kanaWorkouts',
  [TYPE.pitch]: 'pitchWorkouts',
  [TYPE.rhythm]: 'rhythmWorkouts',
};

export const getAppWorkouts = (type: string, state: State) => {
  switch (type) {
    case TYPE.kana:
      return state.kanaWorkouts;
    case TYPE.pitch:
      return state.pitchWorkouts;
    case TYPE.rhythm:
    default:
      return state.rhythmWorkouts;
  }
};

export const setSceneToWorkoutState = (state: WorkoutState, scene: string) => {
  let updatedState = R.assocPath<string, WorkoutState>(['scene'], scene)(state);
  switch (scene) {
    case SCENE.opening:
      // TODO
      break;
    case SCENE.practice:
      updatedState = R.assocPath<number, WorkoutState>(
        ['log', scene, 'answers', 0, 'createdAt'],
        new Date().getTime()
      )(updatedState);
      break;
    case SCENE.result:
      updatedState = R.assocPath<number, WorkoutState>(
        ['log', scene, 'createdAt'],
        new Date().getTime()
      )(updatedState);
      break;
    default:
  }
  return updatedState;
};

export const updateWorkoutLog = (
  type: string,
  log: WorkoutLog,
  workout: Workout,
  appState: State,
  unlock?: boolean
) => {
  const updatedWorkout = R.assocPath<WorkoutLog, Workout>(
    ['logs', log.id],
    log
  )(workout);
  setWorkout(type, updatedWorkout);

  let updatedAppState = R.assocPath<Workout, State>(
    [PROP[type], updatedWorkout.id],
    updatedWorkout
  )(appState);

  if (unlock) {
    const workouts = getAppWorkouts(type, appState);
    updatedAppState = unlockNextWorkout(
      type,
      workout.id,
      workouts,
      updatedAppState
    );
  }

  return updatedAppState;
};

/** id のみ */
export const getCueIds = (type: string, state: WorkoutState) => {
  switch (type) {
    case TYPE.kana:
      return state.kanas;
    case TYPE.pitch:
    case TYPE.rhythm:
    default:
      return state.cueIds;
  }
};

export const getCueIdsFromLog = (type: string, log: WorkoutLog) => {
  switch (type) {
    case TYPE.kana:
      return log.kanas;
    case TYPE.pitch:
    case TYPE.rhythm:
    default:
      return log.cueIds;
  }
};

/** id と pitchStr */
export const getCues = (type: string, state: WorkoutState) => {
  const kanaCues = buildKanaCues(state.kanas);
  const pitchCues = buildPitchCues(type, state.cueIds);

  const CUES = {
    [TYPE.kana]: kanaCues,
    [TYPE.pitch]: pitchCues,
    [TYPE.rhythm]: pitchCues,
  };
  const cues = CUES[type];
  return cues;
};

export const getInput = (
  type: string,
  cue: { id: string; pitchStr: string }
) => {
  const INPUT = {
    [TYPE.kana]: cue.id,
    [TYPE.pitch]: cue.pitchStr,
    [TYPE.rhythm]: cue.pitchStr,
  };
  return INPUT[type];
};

const unlockNextWorkout = (
  type: string,
  workoutId: string,
  workouts: { [key: string]: Workout },
  appState: State
) => {
  const nextWorkoutId = getNextWorkoutId(workoutId, workouts);
  if (!nextWorkoutId) return appState;

  // isLocked を false にする
  const updatedNextWorkout = R.assocPath<boolean, Workout>(
    ['isLocked'],
    false
  )(workouts[nextWorkoutId]);
  setWorkout(type, updatedNextWorkout);

  const updatedAppState = R.assocPath<Workout, State>(
    [PROP[type], updatedNextWorkout.id],
    updatedNextWorkout
  )(appState);
  return updatedAppState;
};

const getNextWorkoutId = (
  currentId: string,
  workouts: { [key: string]: Workout }
) => {
  const workoutListIds = Object.values(workouts)
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((item) => item.id);
  const targetWorkoutIndex = workoutListIds.indexOf(currentId);
  const nextWorkoutId = workoutListIds[targetWorkoutIndex + 1] || '';
  return nextWorkoutId;
};
