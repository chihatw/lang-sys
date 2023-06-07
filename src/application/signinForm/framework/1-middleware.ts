import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { RootState } from '../../../main';
import { userActions } from '../../user/framework/0-reducer';
import { signinFormActions } from './0-reducer';

const loginInitiate =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'signinForm/signinInitiate': {
        dispatch(userActions.signinStart());
        const { email, password } = (getState() as RootState).signinForm;
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
      default:
    }
  };

export default [loginInitiate];
