import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const signinFormSlice = createSlice({
  name: 'signinForm',
  initialState,
  reducers: {
    changeEmail: (state, { payload }: { payload: string }) => {
      state.email = payload;
      state.hasError = false;
    },
    changePassword: (state, { payload }: { payload: string }) => {
      state.password = payload;
      state.hasError = false;
    },
    signinInitiate: (state) => state,
    resetSigninForm: () => initialState,
  },
});

export const signinFormActions = signinFormSlice.actions;

export default signinFormSlice.reducer;
