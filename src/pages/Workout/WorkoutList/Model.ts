import * as R from 'ramda';
import React from 'react';
import { RhythmWorkout, State } from '../../../Model';
import { getRhythmWorkouts } from '../../../services/rhythmWorkout';
import { Action, ActionTypes } from '../../../Update';

export type WorkoutListItem = {
  id: string;
  type: string;
  title: string;
};

export const buildWorkoutListItems = async (
  state: State,
  type: string,
  dispatch: React.Dispatch<Action>
): Promise<WorkoutListItem[]> => {
  let workoutListItems: WorkoutListItem[] = [];
  switch (type) {
    case 'listening':
      if (Object.keys(state.rhythmWorkouts).length) {
        workoutListItems = Object.values(state.rhythmWorkouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((item) => ({ id: item.id, title: item.title, type }));
      } else {
        const rhythmWorkouts = await getRhythmWorkouts(state.user!.uid);
        workoutListItems = Object.values(rhythmWorkouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((item) => ({ id: item.id, title: item.title, type }));

        const updatedState = R.assocPath<
          { [id: string]: RhythmWorkout },
          State
        >(
          ['rhythmWorkouts'],
          rhythmWorkouts
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
      }
    default:
  }
  return workoutListItems;
};
