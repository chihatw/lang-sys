import * as R from 'ramda';
import React from 'react';
import { RhythmWorkout, State } from '../../../Model';
import { getRhythmWorkouts } from '../../../services/rhythmWorkout';
import { Action, ActionTypes } from '../../../Update';

export type WorkoutListItem = {
  id: string;
  type: string;
  title: string;
  logs: { createdAt: number; correctRatio: number }[];
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
            title: rhythmWorkout.title,
            type,
            logs,
          };
        });

    default:
  }
  return workoutListItems;
};
