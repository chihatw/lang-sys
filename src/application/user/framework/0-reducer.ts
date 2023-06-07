import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';
import { User } from 'firebase/auth';

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User }) => {
      state.loading = false;
      state.authInitializing = false;
      state.currentUser = payload;
    },
    removeUser: (state) => {
      state.loading = false;
      state.authInitializing = false;
      state.currentUser = null;
    },
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, { payload }: { payload: User }) => {
      state.loading = false;
      state.currentUser = payload;
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
      state.currentUser = null;
    },
    signoutFail: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errorMsg = payload;
    },
    signoutInitiate: (state) => state,
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
