import { User } from '@firebase/auth';

export interface IAuthUser {
  initializing: boolean;
  currentUid: string;
  loginUser: User | null;
}
