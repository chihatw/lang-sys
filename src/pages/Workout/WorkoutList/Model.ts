import * as R from 'ramda';
import React from 'react';
import {
  KanaWorkout,
  KanaWorkoutLog,
  RhythmWorkout,
  RhythmWorkoutLog,
  State,
} from '../../../Model';
import { getKanaWorkouts } from '../../../services/kanaWorkout';
import { getRhythmWorkouts } from '../../../services/rhythmWorkout';
import { Action, ActionTypes } from '../../../Update';

export type WorkoutListItem = {
  id: string;
  type: string;
  title: string;
  logs: { createdAt: number; correctRatio: number }[];
  isLocked: boolean;
};

export const buildWorkoutListItems = async (
  state: State,
  type: string,
  dispatch: React.Dispatch<Action>
): Promise<WorkoutListItem[]> => {
  let workoutListItems: WorkoutListItem[] = [];
  switch (type) {
    case 'rhythm':
      const rhythmWorkouts = await buildRhythmWorkouts(state, dispatch);
      workoutListItems = Object.values(rhythmWorkouts)
        /** リストの並べ替え */
        .sort((a, b) => a.createdAt - b.createdAt)
        /** ログの整形 */
        .map((rhythmWorkout) => ({
          id: rhythmWorkout.id,
          logs: buildRhythmWorkoutLogs(rhythmWorkout),
          type,
          title: rhythmWorkout.title,
          isLocked: rhythmWorkout.isLocked,
        }));
      break;
    case 'kana':
      const kanaWorkouts = await buildKanaWorkouts(state, dispatch);
      workoutListItems = Object.values(kanaWorkouts)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((kanaWorkout) => ({
          id: kanaWorkout.id,
          logs: buildKanaWorkoutLogs(kanaWorkout),
          type,
          title: kanaWorkout.title,
          isLocked: kanaWorkout.isLocked,
        }));
      break;
    default:
  }
  return workoutListItems;
};

const buildRhythmWorkouts = async (
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  let rhythmWorkouts: { [id: string]: RhythmWorkout } = {};
  /** ローカルにある場合 */
  if (Object.keys(state.rhythmWorkouts).length) {
    rhythmWorkouts = state.rhythmWorkouts;
  } else {
    /** ローカルにない場合 */
    rhythmWorkouts = await getRhythmWorkouts({ uid: state.user!.uid });
    const updatedState = R.assocPath<{ [id: string]: RhythmWorkout }, State>(
      ['rhythmWorkouts'],
      rhythmWorkouts
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }
  return rhythmWorkouts;
};

const buildKanaWorkouts = async (
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  let kanaWorkouts: { [id: string]: KanaWorkout } = {};
  if (Object.keys(state.kanaWorkouts).length) {
    kanaWorkouts = state.kanaWorkouts;
  } else {
    kanaWorkouts = await getKanaWorkouts({ uid: state.user!.uid });
    const updatedState = R.assocPath<{ [id: string]: KanaWorkout }, State>(
      ['kanaWorkouts'],
      kanaWorkouts
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }
  return kanaWorkouts;
};

const buildRhythmWorkoutLogs = (rhythmWorkout: RhythmWorkout) => {
  const logs: { createdAt: number; correctRatio: number }[] = Object.values(
    rhythmWorkout.logs
  )
    .filter((item) => !!item.result.createdAt)

    /** createdAt で並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((item) => ({
      createdAt: item.createdAt,
      correctRatio: buildCorrectRatio_rhythm(item, rhythmWorkout.cueIds.length),
    }));
  return logs;
};

const buildKanaWorkoutLogs = (kanaWorkout: KanaWorkout) => {
  const logs: { createdAt: number; correctRatio: number }[] = Object.values(
    kanaWorkout.logs
  )
    .filter((item) => !!item.result.createdAt)
    /** createdAt で並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((item) => ({
      createdAt: item.createdAt,
      correctRatio: buildCorrectRatio_kana(item, kanaWorkout.kanas.length),
    }));
  return logs;
};

const buildCorrectRatio_rhythm = (item: RhythmWorkoutLog, length: number) => {
  let correctCount = 0;
  Object.values(item.practice.answers).forEach((answer, index) => {
    const correct = item.cueIds[index];
    if (answer.selected === correct) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / length) * 100);
  return correctRatio;
};

const buildCorrectRatio_kana = (item: KanaWorkoutLog, length: number) => {
  let correctCount = 0;
  Object.values(item.practice.answers).forEach((answer, index) => {
    const kana = item.kanas[index];
    if (answer.selected === kana) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / length) * 100);
  return correctRatio;
};
