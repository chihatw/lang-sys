import { IAuthUser } from './0-interface';

export const initialState: IAuthUser = {
  authInitializing: true,
  loading: false,
  currentUid: '',
  errorMsg: '',
  loginUser: null,
};
