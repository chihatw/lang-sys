import { User } from '@firebase/auth';

export interface IAuthUser {
  authInitializing: boolean;
  loading: boolean;
  currentUid: string;
  errorMsg: string;
  loginUser: User | null;
}
