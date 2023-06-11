import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { User } from 'firebase/auth';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User }) => {
      state.loading = false;
      state.authInitializing = false;
      state.currentUid = payload.uid;
      state.loginUser = payload;
    },
    setCurrentUid: (state, { payload }: { payload: string }) => {
      state.currentUid = payload;
    },
    removeUser: (state) => {
      state.loading = false;
      state.authInitializing = false;
      state.currentUid = '';
      state.loginUser = null;
    },
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, { payload }: { payload: User }) => {
      state.loading = false;
      state.currentUid = payload.uid;
      state.loginUser = payload;
    },
    signinFail: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errorMsg = payload;
    },
    signoutStart: (state) => {
      state.loading = true;
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.currentUid = '';
      state.loginUser = null;
    },
    signoutFail: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errorMsg = payload;
    },
    signoutInitiate: (state) => state,
  },
});

export default authUserSlice.reducer;

export const authUserActions = authUserSlice.actions;
