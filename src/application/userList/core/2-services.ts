import { User } from 'firebase/auth';
import { LOCAL_STORAGE_KEY } from './1-constants';

export const getSelectedUidFromLocalStorage = (loginUser: User) => {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || loginUser.uid;
};

export const setSelectedUidToLocalStorage = (selectedUid: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, selectedUid);
};
