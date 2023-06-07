import { User } from '@firebase/auth';

export interface IUser {
  authInitializing: boolean;
  loading: boolean;
  currentUser: User | null;
  errorMsg: string;
}
