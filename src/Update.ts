import * as R from 'ramda';
import { User } from '@firebase/auth';
import { State } from './Model';

export const ActionTypes = {
  setState: 'setState',
  setUser: 'setUser',
};

export type Action = {
  type: string;
  payload?: State | null | User;
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.setState:
      return payload as State;
    case ActionTypes.setUser:
      const user = payload as User | null;
      return R.compose(
        R.assocPath<User | null, State>(['user'], user),
        R.assocPath<boolean, State>(['authInitializing'], false)
      )(state);
    default:
      return state;
  }
};
