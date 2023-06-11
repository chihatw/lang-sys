import { IAuthUser } from './0-interface';

export const initialState: IAuthUser = {
  authInitializing: true,
  loading: false,
  currentUser: { uid: '', isDebugging: true },
  errorMsg: '',
  loginUser: null,
};
