import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { usersAcions } from './0-reducer';
import { userListActions } from 'application/userList/framework/0-reducer';

const usersMiddleWare =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'userList/initiate': {
        const selectedUid = action.payload as string;
        const users = await services.api.users.fetchUsers();
        dispatch(usersAcions.setUsers(users));
        const uids = Object.keys(users);

        dispatch(
          userListActions.setUserIds({
            uids,
            selectedUid,
          })
        );
        break;
      }
      default:
    }
  };

export default [usersMiddleWare];
