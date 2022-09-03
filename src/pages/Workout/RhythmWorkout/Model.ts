import { nanoid } from 'nanoid';
import * as R from 'ramda';
import downpitch_120 from '../../../assets/audios/downpitch_120.mp3';
import React from 'react';
import {
  INITIAL_RHYTHM_WORKOUT_LOG,
  RhythmWorkout,
  RhythmWorkoutLog,
  State,
} from '../../../Model';
import { Action, ActionTypes } from '../../../Update';
import { shuffle } from '../../../services/utils';

export type RhythmWorkoutState = {
  id: string;
  log: RhythmWorkoutLog;
  blob: Blob | null;
  pane: string;
  cueIds: string[];
  audioContext: AudioContext | null;
  currentIndex: number;
};

export const INITIAL_RHYTHM_WORKOUT_STATE: RhythmWorkoutState = {
  id: '',
  blob: null,
  pane: 'opening',
  cueIds: [],
  audioContext: null,
  currentIndex: 0,
  log: INITIAL_RHYTHM_WORKOUT_LOG,
};

export const buildRhythmWorkoutState = async (
  state: State,
  workout: RhythmWorkout,
  dispatch: React.Dispatch<Action>
): Promise<RhythmWorkoutState> => {
  if (!workout.id) return INITIAL_RHYTHM_WORKOUT_STATE;
  let blob: Blob | null = null;
  if (state.blobs[downpitch_120]) {
    blob = state.blobs[downpitch_120];
  } else {
    const response = await fetch(downpitch_120);
    blob = await response.blob();
    const updatedState = R.assocPath<Blob | null, State>(
      ['blobs', downpitch_120],
      blob
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }

  const cueIds = shuffle(workout.cueIds);

  return {
    id: workout.id,
    blob,
    pane: 'opening',
    cueIds,
    audioContext: state.audioContext,
    currentIndex: 0,
    log: {
      ...INITIAL_RHYTHM_WORKOUT_LOG,
      id: nanoid(8),
      createdAt: new Date().getTime(),
      cueIds,
    },
  };
};
