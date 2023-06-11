import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { User } from 'firebase/auth';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User }) => {
      state.initializing = false;
      state.currentUid = payload.uid;
      state.loginUser = payload;
    },
    setCurrentUid: (state, { payload }: { payload: string }) => {
      state.currentUid = payload;
    },
    removeUser: (state) => {
      state.initializing = false;
      state.currentUid = '';
      state.loginUser = null;
    },
    setLoginUser: (state, { payload }: { payload: User }) => {
      state.currentUid = payload.uid;
      state.loginUser = payload;
    },
    signoutSuccess: (state) => {
      state.currentUid = '';
      state.loginUser = null;
    },
    signoutInitiate: (state) => state,
  },
});

export default authUserSlice.reducer;

export const authUserActions = authUserSlice.actions;
