import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { recordWorkoutListActions } from './0-reducer';

const recordWorkoutListMiddleware =
  (services: Services): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'authUser/setCurrentUid': {
        dispatch(recordWorkoutListActions.resetState());
        break;
      }
      default:
    }
  };

export default [recordWorkoutListMiddleware];
