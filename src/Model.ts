import { User } from '@firebase/auth';

export type WhiteBoardState = {
  texts: { [uid: string]: string };
};

export type State = {
  user: User | null;
  whiteBoardTexts: { [uid: string]: string };
  authInitializing: boolean;
};

export const INITIAL_STATE: State = {
  user: null,
  whiteBoardTexts: {},
  authInitializing: true,
};
