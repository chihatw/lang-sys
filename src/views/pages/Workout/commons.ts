import * as R from 'ramda';
import { Dispatch } from 'react';
import { State, Workout } from '../../../Model';
import { setWorkout } from '../../../services/workout';
import { Action, ActionTypes } from '../../../Update';
import { WorkoutState } from './WorkoutPage/Model';
import { IWorkoutLog } from '../../../application/workoutLog/core/0-interface';

export const TYPE = {
  kana: 'kana',
  pitch: 'pitch',
  rhythm: 'rhythm',
  record: 'record',
  pitchInput: 'pitchInput',
  chineseCue: 'chineseCue',
};

export const SCENE = {
  opening: 'opening',
  practice: 'practice',
  result: 'result',
};

export const workoutPropSwitch = (type: string) => {
  switch (type) {
    case TYPE.kana:
      return 'kanaWorkouts';
    case TYPE.pitch:
      return 'pitchWorkouts';
    case TYPE.pitchInput:
      return 'pitchInputWorkouts';
    case TYPE.rhythm:
      return 'rhythmWorkouts';
    case TYPE.record:
      return 'recordWorkouts';
    default:
      console.error(`incorrect type: ${type}`);
      return '';
  }
};

export const workoutsSwitch = (state: State, type: string) => {
  switch (type) {
    case TYPE.record:
      return state.recordWorkouts;
    case TYPE.chineseCue:
      return state.chineseCueWorkouts;
    default:
      console.error(`incorrect type: ${type}`);
      return {};
  }
};

export const setSceneToWorkoutState = (state: WorkoutState, scene: string) => {
  let updatedState = R.assocPath<string, WorkoutState>(['scene'], scene)(state);
  switch (scene) {
    case SCENE.opening:
      break;
    case SCENE.practice:
      updatedState = R.assocPath<number, WorkoutState>(
        ['log', SCENE.practice, 'answers', 0, 'createdAt'],
        new Date().getTime()
      )(updatedState);
      break;
    case SCENE.result:
      updatedState = R.assocPath<number, WorkoutState>(
        ['log', SCENE.result, 'createdAt'],
        new Date().getTime()
      )(updatedState);
      break;
    default:
  }
  return updatedState;
};

/**
 * app, remote
 */
export const updateWorkoutLog = (
  type: string,
  log: IWorkoutLog,
  workout: Workout,
  state: State,
  dispatch: Dispatch<Action>
) => {
  const updatedWorkout = R.assocPath<IWorkoutLog, Workout>(
    ['logs', log.id],
    log
  )(workout);

  const workoutProp = workoutPropSwitch(type);
  if (!workoutProp) return;

  const updatedState = R.assocPath<Workout, State>(
    [workoutProp, workout.id],
    updatedWorkout
  )(state);

  // app
  dispatch({ type: ActionTypes.setState, payload: updatedState });

  // remote
  setWorkout(type, updatedWorkout);
};

export const getCueIdsFromLog = (type: string, log: IWorkoutLog) => {
  switch (type) {
    case TYPE.kana:
      return log.kanas;
    case TYPE.pitch:
    case TYPE.rhythm:
    default:
      return log.cueIds;
  }
};

export const inputSwitch = (
  type: string,
  cue: { id: string; pitchStr: string }
) => {
  switch (type) {
    case TYPE.kana:
      return cue.id;
    case TYPE.pitch:
    case TYPE.rhythm:
    case TYPE.record:
    case TYPE.pitchInput:
      return cue.pitchStr;

    default:
      console.error(`incorrect type: ${type}`);
      return '';
  }
};
