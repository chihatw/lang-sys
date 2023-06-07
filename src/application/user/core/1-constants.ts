import { IUser } from './0-interface';

export const initialState: IUser = {
  authInitializing: true,
  loading: false,
  currentUser: null,
  errorMsg: '',
};
