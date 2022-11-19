import { nanoid } from 'nanoid';
import * as R from 'ramda';
import React from 'react';
import {
  INITIAL_WORKOUT_LOG,
  Workout,
  WorkoutLog,
  State,
} from '../../../Model';
import { Action, ActionTypes } from '../../../Update';
import { shuffle } from '../../../services/utils';
import { PROP, SCENE, TYPE } from '../commons';
import { setWorkout } from '../../../services/rhythmWorkout';

export type WorkoutState = {
  id: string;
  log: WorkoutLog;
  blob: Blob | null;
  scene: string;
  kanas: string[];
  cueIds: string[];
  audioContext: AudioContext | null;
  currentIndex: number;
};

export const INITIAL_WORKOUT_STATE: WorkoutState = {
  id: '',
  blob: null,
  scene: SCENE.opening,
  kanas: [],
  cueIds: [],
  audioContext: null,
  currentIndex: 0,
  log: INITIAL_WORKOUT_LOG,
};

export const buildWorkoutState = async (
  type: string,
  state: State,
  workout: Workout,
  dispatch: React.Dispatch<Action>,
  path: string
): Promise<WorkoutState> => {
  if (!workout.id) return INITIAL_WORKOUT_STATE;

  let blob: Blob | null = null;
  if (state.blobs[path]) {
    blob = state.blobs[path];
  } else {
    const response = await fetch(path);
    blob = await response.blob();
    const updatedState = R.assocPath<Blob | null, State>(
      ['blobs', path],
      blob
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }

  const CUEIDS = {
    [TYPE.rhythm]: shuffle(workout.cueIds),
    [TYPE.pitch]: shuffle(workout.cueIds),
    [TYPE.kana]: [],
  };

  const KANAS = {
    [TYPE.rhythm]: [],
    [TYPE.pitch]: [],
    [TYPE.kana]: shuffle(workout.kanas),
  };

  return {
    id: workout.id,
    blob,
    scene: SCENE.opening,
    kanas: KANAS[type],
    cueIds: CUEIDS[type],
    audioContext: state.audioContext,
    currentIndex: 0,
    log: {
      ...INITIAL_WORKOUT_LOG,
      id: nanoid(8),
      kanas: KANAS[type],
      cueIds: CUEIDS[type],
      createdAt: new Date().getTime(),
    },
  };
};
