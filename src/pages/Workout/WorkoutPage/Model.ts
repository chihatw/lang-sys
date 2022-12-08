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
import { blobToAudioBuffer, shuffle } from '../../../services/utils';
import { SCENE, TYPE } from '../commons';

export type WorkoutState = {
  id: string;
  log: WorkoutLog;
  scene: string;
  kanas: string[];
  cueIds: string[];
  audioBuffer: AudioBuffer | null;
  audioContext: AudioContext | null;
  currentIndex: number;
};

export const INITIAL_WORKOUT_STATE: WorkoutState = {
  id: '',
  scene: SCENE.opening,
  kanas: [],
  cueIds: [],
  audioBuffer: null,
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
  if (!workout.id || !state.audioContext) return INITIAL_WORKOUT_STATE;

  let audioBuffer: AudioBuffer | null = null;
  if (state.audioBuffers[path]) {
    audioBuffer = state.audioBuffers[path];
  } else {
    const response = await fetch(path);
    const blob = await response.blob();
    audioBuffer = await blobToAudioBuffer(blob, state.audioContext);
    const updatedState = R.assocPath<AudioBuffer | null, State>(
      ['audioBuffers', path],
      audioBuffer
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }

  const CUEIDS = {
    [TYPE.kana]: [],
    [TYPE.pitch]: shuffle(workout.cueIds),
    [TYPE.rhythm]: shuffle(workout.cueIds),
    [TYPE.pitchInput]: shuffle(workout.cueIds),
  };

  const KANAS = {
    [TYPE.kana]: shuffle(workout.kanas),
    [TYPE.pitch]: [],
    [TYPE.rhythm]: [],
    [TYPE.pitchInput]: [],
  };

  return {
    id: workout.id,
    scene: SCENE.opening,
    kanas: KANAS[type],
    cueIds: CUEIDS[type],
    audioBuffer,
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
