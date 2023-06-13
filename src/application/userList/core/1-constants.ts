import { IUserList } from './0-interface';

export const initialState: IUserList = {
  uids: [],
  selectedUid: '',
};

export const LOCAL_STORAGE_KEY = 'selectedUid@lang-sys';
