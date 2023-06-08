import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { recordWorkoutActions } from './0-reducer';
import { recordWorkoutListActions } from '../../recordWorkoutList/framework/0-reducer';

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
      default:
    }
  };

export default [recordWorkoutsMiddleware];
