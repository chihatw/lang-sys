import * as R from 'ramda';
import { Dispatch } from 'react';
import { State } from '../../../Model';
import { setWorkout } from '../../../services/workout';
import { Action, ActionTypes } from '../../../Update';
import { WorkoutState } from './WorkoutPage/Model';
import { IWorkoutLog } from '../../../application/workoutLog/core/0-interface';
import { IRecordWorkout } from '../../../application/recordWorkouts/core/0-interface';

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

export const setSceneToWorkoutState = (state: WorkoutState, scene: string) => {
  let updatedState = R.assocPath<string, WorkoutState>(['scene'], scene)(state);
  return updatedState;
};

/**
 * app, remote
 */
export const updateWorkoutLog = (
  log: IWorkoutLog,
  workout: IRecordWorkout,
  state: State,
  dispatch: Dispatch<Action>
) => {
  const updatedWorkout = R.assocPath<IWorkoutLog, IRecordWorkout>(
    ['logs', log.id],
    log
  )(workout);

  const updatedState = R.assocPath<IRecordWorkout, State>(
    ['recordWorkouts', workout.id],
    updatedWorkout
  )(state);

  // app
  dispatch({ type: ActionTypes.setState, payload: updatedState });

  // remote
  setWorkout(updatedWorkout);
};
