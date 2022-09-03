import { nanoid } from 'nanoid';
import * as R from 'ramda';
import gojuuon from '../../../assets/audios/gojuuon.mp3';
import React from 'react';
import {
  INITIAL_KANA_WORKOUT_LOG,
  KanaWorkout,
  KanaWorkoutLog,
  State,
} from '../../../Model';
import { Action, ActionTypes } from '../../../Update';
import { shuffle } from '../../../services/utils';

export type KanaWorkoutState = {
  id: string;
  log: KanaWorkoutLog;
  blob: Blob | null;
  pane: string;
  kanas: string[];
  audioContext: AudioContext | null;
  currentIndex: number;
};

export const INITIAL_KANA_WORKOUT_STATE: KanaWorkoutState = {
  id: '',
  blob: null,
  pane: 'opening',
  kanas: [],
  audioContext: null,
  currentIndex: 0,
  log: INITIAL_KANA_WORKOUT_LOG,
};

export const buildKanaWorkoutState = async (
  state: State,
  workout: KanaWorkout,
  dispatch: React.Dispatch<Action>
): Promise<KanaWorkoutState> => {
  if (!workout.id) return INITIAL_KANA_WORKOUT_STATE;
  let blob: Blob | null = null;
  if (state.blobs[gojuuon]) {
    blob = state.blobs[gojuuon];
  } else {
    const response = await fetch(gojuuon);
    blob = await response.blob();
    const updatedState = R.assocPath<Blob | null, State>(
      ['blobs', gojuuon],
      blob
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }

  const kanas = shuffle(workout.kanas);

  return {
    id: workout.id,
    blob,
    pane: 'opening',
    kanas,
    audioContext: state.audioContext,
    currentIndex: 0,
    log: {
      ...INITIAL_KANA_WORKOUT_LOG,
      id: nanoid(8),
      createdAt: new Date().getTime(),
      kanas,
    },
  };
};
