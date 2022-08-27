import { User } from '@firebase/auth';

export type State = {
  user: User | null;
  authInitializing: boolean;
};

export const INITIAL_STATE: State = {
  user: null,
  authInitializing: true,
};
