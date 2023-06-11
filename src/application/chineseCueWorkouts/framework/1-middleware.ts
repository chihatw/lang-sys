import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { chineseCueWorkoutsActions } from './0-reducer';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';

import { shuffle } from 'application/utils/utils';
import { chineseCueWorkoutListActions } from 'application/chineseCueWorkoutList/framework/0-reducer';
import { chineseCueWorkoutPracticeActions } from 'application/chineseCueWorkoutPractice/framework/0-reducer';
const chineseCueWorkoutsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'chineseCueWorkoutList/initiate': {
        const uid = (getState() as RootState).authUser.currentUid;
        // workouts の取得
        const workouts = await services.api.chineseCueWorkouts.fetchWorkouts(
          uid
        );
        dispatch(chineseCueWorkoutsActions.concatWorkouts(workouts));

        const workoutIds = Object.values(workouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout) => workout.id);

        dispatch(chineseCueWorkoutListActions.setWorkoutIds(workoutIds));
        break;
      }
      case 'chineseCueWorkoutPractice/initiate': {
        const workoutId: string = action.payload.workoutId;
        const chineseCueWorkouts = (getState() as RootState).chineseCueWorkouts;

        const workout = chineseCueWorkouts[workoutId];

        // workout が存在する場合
        if (!!workout) {
          const shuffledCueIds = shuffle([...workout.cueIds]);
          dispatch(
            chineseCueWorkoutPracticeActions.setWorkoutIdAndShuffledCueIds({
              workoutId,
              shuffledCueIds,
            })
          );
        }

        // wokrout が存在しない場合
        const gotWorkout = await services.api.chineseCueWorkouts.fetchWorkout(
          workoutId
        );

        if (!!gotWorkout) {
          dispatch(
            chineseCueWorkoutsActions.concatWorkouts({
              [workoutId]: gotWorkout,
            })
          );

          const shuffledCueIds = shuffle([...gotWorkout.cueIds]);
          dispatch(
            chineseCueWorkoutPracticeActions.setWorkoutIdAndShuffledCueIds({
              workoutId,
              shuffledCueIds,
            })
          );
        }
        break;
      }
      default:
    }
  };

export default [chineseCueWorkoutsMiddleware];
