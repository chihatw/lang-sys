import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { usersAcions } from './0-reducer';
import { userListActions } from 'application/userList/framework/0-reducer';
import { RootState } from 'main';

const usersMiddleWare =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'userList/initiate': {
        const { loginUser } = (getState() as RootState).authUser;
        const users = await services.api.users.fetchUsers();
        dispatch(usersAcions.concatUsers(users));
        const uids = Object.keys(users);

        dispatch(
          userListActions.setUserIds({
            uids,
            selectedUid: loginUser!.uid,
          })
        );
        break;
      }
      default:
    }
  };

export default [usersMiddleWare];
