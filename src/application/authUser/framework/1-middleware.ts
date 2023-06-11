import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';

import { authUserActions } from 'application/authUser/framework/0-reducer';
import { signinFormActions } from 'application/signinForm/framework/0-reducer';

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
        const { authUser, errorMsg } =
          await services.api.authUser.signInWithEmailAndPassword(
            email,
            password
          );
        if (authUser) {
          dispatch(authUserActions.signinSuccess(authUser));
        } else if (errorMsg) {
          dispatch(authUserActions.signinFail(errorMsg));
        }
        dispatch(signinFormActions.resetSigninForm());
        break;
      }
      case 'authUser/signoutInitiate': {
        dispatch(authUserActions.signoutStart());
        const { errorMsg } = await services.api.authUser.signOut();
        if (!errorMsg) {
          dispatch(authUserActions.signoutSuccess());
        } else {
          dispatch(authUserActions.signoutFail(errorMsg));
        }
        break;
      }
      case 'userList/setSelectedUid': {
        const currentUid = action.payload as string;
        dispatch(authUserActions.setCurrentUid(currentUid));
        break;
      }
      default:
    }
  };

export default [userMiddleware];
