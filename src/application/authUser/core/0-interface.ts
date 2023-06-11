import { User } from '@firebase/auth';

export interface IAuthUser {
  authInitializing: boolean;
  loading: boolean;
  currentUser: { uid: string; isDebugging: boolean };
  errorMsg: string;
  loginUser: User | null;
}
