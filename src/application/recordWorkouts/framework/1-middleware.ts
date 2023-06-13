import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';

import { shuffle } from 'application/utils/utils';
import { recordWorkoutsActions } from 'application/recordWorkouts/framework/0-reducer';
import { recordWorkoutListActions } from 'application/recordWorkoutList/framework/0-reducer';
import { recordWorkoutPracticeActions } from 'application/recordWorkoutPractice/framework/0-reducer';

const recordWorkoutsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/initiate': {
        const uid = (getState() as RootState).authUser.currentUid;
        // workouts の取得
        const workouts = await services.api.recordWorkouts.fetchWorkouts(uid);
        dispatch(recordWorkoutsActions.mergeWorkouts(workouts));

        const workoutIds = Object.values(workouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout) => workout.id);

        dispatch(recordWorkoutListActions.setWorkoutIds(workoutIds));
        break;
      }
      case 'recordWorkoutPractice/initiate': {
        const workoutId: string = action.payload.workoutId;
        const recordWorkouts = (getState() as RootState).recordWorkouts;

        const workout = recordWorkouts[workoutId];

        // workout が存在する場合
        if (!!workout) {
          const shuffledCueIds = shuffle([...workout.cueIds]);
          dispatch(
            recordWorkoutPracticeActions.setWorkoutIdAndShuffledCueIds({
              workoutId,
              shuffledCueIds,
            })
          );
          break;
        }

        // workout が存在しない場合
        const gotWorkout = await services.api.recordWorkouts.fetchWorkout(
          workoutId
        );
        if (!!gotWorkout) {
          dispatch(
            recordWorkoutsActions.mergeWorkouts({ [workoutId]: gotWorkout })
          );

          const shuffledCueIds = shuffle([...gotWorkout.cueIds]);
          dispatch(
            recordWorkoutPracticeActions.setWorkoutIdAndShuffledCueIds({
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

export default [recordWorkoutsMiddleware];
