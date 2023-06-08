import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { recordWorkoutActions } from './0-reducer';
import { recordWorkoutListActions } from '../../recordWorkoutList/framework/0-reducer';
import { RootState } from '../../../main';
import { recordWorkoutPracticeActions } from '../../recordWorkoutPractice/framework/0-reducer';

const recordWorkoutsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/getList': {
        const uid = action.payload.uid as string;
        // workouts の取得
        const workouts = await services.api.recordWorkouts.fetchWorkouts(uid);
        dispatch(recordWorkoutActions.setWorkouts(workouts));

        const workoutIds = Object.values(workouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout) => workout.id);

        dispatch(recordWorkoutListActions.setWorkoutIds(workoutIds));
        break;
      }
      case 'recordWorkoutPractice/setWorkoutIdStart': {
        const workoutId: string = action.payload.workoutId;
        const recordWorkouts = (getState() as RootState).recordWorkouts;

        const workout = recordWorkouts[workoutId];

        // workout が存在する場合
        if (!!workout) {
          dispatch(recordWorkoutPracticeActions.setWorkoutId(workoutId));
          break;
        }

        // workout が存在しない場合
        const gotWorkout = await services.api.recordWorkouts.fetchWorkout(
          workoutId
        );
        if (!!gotWorkout) {
          dispatch(
            recordWorkoutActions.setWorkouts({ [workoutId]: gotWorkout })
          );
          dispatch(recordWorkoutPracticeActions.setWorkoutId(workoutId));
        }

        break;
      }
      default:
    }
  };

export default [recordWorkoutsMiddleware];
