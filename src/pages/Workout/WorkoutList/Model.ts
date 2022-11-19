import * as R from 'ramda';
import React from 'react';
import { State, Workout, WorkoutLog } from '../../../Model';
import { getWorkouts } from '../../../services/rhythmWorkout';
import { Action, ActionTypes } from '../../../Update';
import { getCueIdsFromLog, PROP, TYPE } from '../commons';

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
  const workouts = await buildWorkouts(type, state, dispatch);
  const workoutListItems = Object.values(workouts)
    /** リストの並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    /** ログの整形 */
    .map((workout) => {
      const CUEIDS = {
        [TYPE.pitch]: workout.cueIds,
        [TYPE.rhythm]: workout.cueIds,
        [TYPE.kana]: workout.kanas,
      };

      return {
        id: workout.id,
        logs: sortWorkoutLog(workout, type),
        type,
        title: workout.title,
        isLocked: workout.isLocked,
      };
    });

  return workoutListItems;
};

const buildWorkouts = async (
  type: string,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  let workouts: { [id: string]: Workout } = {};

  const WORKOUTS = {
    [TYPE.kana]: state.kanaWorkouts,
    [TYPE.pitch]: state.pitchWorkouts,
    [TYPE.rhythm]: state.rhythmWorkouts,
  };

  /** ローカルにある場合 */
  if (Object.keys(WORKOUTS[type]).length) {
    workouts = WORKOUTS[type];
  } else {
    /** ローカルにない場合 */
    workouts = await getWorkouts({
      type,
      uid: state.user!.uid,
    });

    const updatedState = R.assocPath<{ [id: string]: Workout }, State>(
      [PROP[type]],
      workouts
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  }
  return workouts;
};

const sortWorkoutLog = (workout: Workout, type: string) => {
  const logs: { createdAt: number; correctRatio: number }[] = Object.values(
    workout.logs
  )
    .filter((item) => !!item.result.createdAt)

    /** createdAt で並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((log) => ({
      createdAt: log.createdAt,
      correctRatio: calcCorrectRatio(log, getCueIdsFromLog(type, log)),
    }));
  return logs;
};

export const calcCorrectRatio = (log: WorkoutLog, correctAnswers: string[]) => {
  let correctCount = 0;

  Object.values(log.practice.answers).forEach((answer, index) => {
    const correctAnswer = correctAnswers[index];

    if (answer.selected === correctAnswer) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / correctAnswers.length) * 100);
  return correctRatio;
};
