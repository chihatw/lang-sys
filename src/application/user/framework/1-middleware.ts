import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { userActions } from './0-reducer';
import { signinFormActions } from '../../signinForm/framework/0-reducer';

const userMiddleware =
  (services: Services): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'signinForm/signinInitiate': {
        const { email, password }: { email: string; password: string } =
          action.payload;
        const { user, errorMsg } =
          await services.api.user.signInWithEmailAndPassword(email, password);
        if (user) {
          dispatch(userActions.signinSuccess(user));
        } else if (errorMsg) {
          dispatch(userActions.signinFail(errorMsg));
        }
        dispatch(signinFormActions.resetSigninForm());
        break;
      }
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

export default [userMiddleware];
