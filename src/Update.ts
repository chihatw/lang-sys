import * as R from 'ramda';
import { State } from './Model';

export const ActionTypes = {
  setState: 'setState',
  setAudioContext: 'setAudioContext',
};

export type Action = {
  type: string;
  payload?: State | null | string | AudioContext;
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.setState:
      return payload as State;
    case ActionTypes.setAudioContext:
      const audioContext = payload as AudioContext | null;
      return R.assocPath<AudioContext | null, State>(
        ['audioContext'],
        audioContext
      )(state);
    default:
      return state;
  }
};
