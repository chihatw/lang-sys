import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';

import { authUserActions } from 'application/authUser/framework/0-reducer';
import { chineseCueWorkoutListActions } from 'application/chineseCueWorkoutList/framework/0-reducer';
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
          dispatch(authUserActions.setLoginUser(authUser.uid));
          dispatch(signinFormActions.signInSuccess());
        } else if (errorMsg) {
          dispatch(signinFormActions.setHasError());
        }
        break;
      }
      case 'authUser/signoutInitiate': {
        const { errorMsg } = await services.api.authUser.signOut();
        if (!errorMsg) {
          dispatch(authUserActions.signoutSuccess());
        }
        break;
      }
      case 'userList/setSelectedUid': {
        const currentUid = action.payload as string;
        dispatch(authUserActions.setCurrentUid(currentUid));
        dispatch(chineseCueWorkoutListActions.resetState());
        break;
      }
      default:
    }
  };

export default [userMiddleware];
