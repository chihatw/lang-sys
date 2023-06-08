import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';

const fetchRecordWorkout =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutPractice/fetchRecordWorkout': {
        const id = action.payload as string;
        const workout = await services.api.recordWorkouts.fetchWorkout(id);
        console.log({ workout });
        // todo
        break;
      }
      default:
    }
  };

export default [fetchRecordWorkout];
