import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';

import { chineseCueWorkoutListActions } from './0-reducer';

const chineseCueWorkoutListMiddleware =
  (services: Services): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'authUser/setCurrentUid': {
        dispatch(chineseCueWorkoutListActions.resetState());
        break;
      }
      default:
    }
  };

export default [chineseCueWorkoutListMiddleware];
