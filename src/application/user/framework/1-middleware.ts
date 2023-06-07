import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { userActions } from './0-reducer';

const logoutInitiate =
  (services: Services): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'user/signoutInitiate': {
        dispatch(userActions.signoutStart());
        const { errorMsg } = await services.api.user.signOut();
        if (!errorMsg) {
          dispatch(userActions.signoutSuccess());
        } else {
          dispatch(userActions.signoutFail(errorMsg));
        }
        break;
      }
      default:
    }
  };

export default [logoutInitiate];
