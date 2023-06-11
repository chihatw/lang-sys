import { IAuthUser } from './0-interface';

export const initialState: IAuthUser = {
  initializing: true,
  currentUid: '',
  loginUser: null,
};
