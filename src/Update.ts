import * as R from 'ramda';
import { User } from '@firebase/auth';
import { State } from './Model';

export const ActionTypes = {
  setUser: 'setUser',
  setState: 'setState',
  setWhiteBoardText: 'setWhiteBoardText',
};

export type Action = {
  type: string;
  payload?: State | null | User | string;
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.setState:
      return payload as State;
    case ActionTypes.setWhiteBoardText:
      const text = payload as string;
      return R.assocPath<string, State>(['whiteBoardText'], text)(state);
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
