import * as R from 'ramda';
import React from 'react';
import { KanaWorkout, RhythmWorkout, State } from '../../../Model';
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
    case 'listening':
      let rhythmWorkouts: { [id: string]: RhythmWorkout } = {};
      if (Object.keys(state.rhythmWorkouts).length) {
        rhythmWorkouts = state.rhythmWorkouts;
      } else {
        rhythmWorkouts = await getRhythmWorkouts(state.user!.uid);
        const updatedState = R.assocPath<
          { [id: string]: RhythmWorkout },
          State
        >(
          ['rhythmWorkouts'],
          rhythmWorkouts
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
      }
      workoutListItems = Object.values(rhythmWorkouts)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((rhythmWorkout) => {
          const logs: { createdAt: number; correctRatio: number }[] =
            Object.values(rhythmWorkout.logs)
              .filter((item) => !!item.result.createdAt)
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((item) => {
                let correctCount = 0;

                Object.values(item.practice.answers).forEach(
                  (answer, index) => {
                    const cueId = item.cueIds[index];
                    if (answer.selected === cueId) {
                      correctCount++;
                    }
                  }
                );

                const correctRatio = Math.round(
                  (correctCount / rhythmWorkout.cueIds.length) * 100
                );

                return {
                  createdAt: item.createdAt,
                  correctRatio,
                };
              });

          return {
            id: rhythmWorkout.id,
            logs,
            type,
            title: rhythmWorkout.title,
            isLocked: rhythmWorkout.isLocked,
          };
        });
      break;
    case 'kana':
      let kanaWorkouts: { [id: string]: KanaWorkout } = {};
      if (Object.keys(state.kanaWorkouts).length) {
        kanaWorkouts = state.kanaWorkouts;
      } else {
        kanaWorkouts = await getKanaWorkouts(state.user!.uid);
        const updatedState = R.assocPath<{ [id: string]: KanaWorkout }, State>(
          ['kanaWorkouts'],
          kanaWorkouts
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
      }
      workoutListItems = Object.values(kanaWorkouts)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((kanaWorkout) => {
          const logs: { createdAt: number; correctRatio: number }[] =
            Object.values(kanaWorkout.logs)
              .filter((item) => !!item.result.createdAt)
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((item) => {
                let correctCount = 0;

                Object.values(item.practice.answers).forEach(
                  (answer, index) => {
                    const kana = item.kanas[index];
                    if (answer.selected === kana) {
                      correctCount++;
                    }
                  }
                );

                const correctRatio = Math.round(
                  (correctCount / kanaWorkout.kanas.length) * 100
                );

                return {
                  createdAt: item.createdAt,
                  correctRatio,
                };
              });

          return {
            id: kanaWorkout.id,
            logs,
            type,
            title: kanaWorkout.title,
            isLocked: kanaWorkout.isLocked,
          };
        });
      break;
    default:
  }
  return workoutListItems;
};
