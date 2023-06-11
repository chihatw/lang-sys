import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const signinFormSlice = createSlice({
  name: 'signinForm',
  initialState,
  reducers: {
    setHasError: (state) => {
      state.hasError = true;
      state.isLoading = false;
    },
    signinInitiate: (
      state,
      { payload }: { payload: { email: string; password: string } }
    ) => {
      state.isLoading = true;
    },
    resetHasError: (state) => {
      state.hasError = false;
    },
    signInSuccess: () => initialState,
  },
});

export const signinFormActions = signinFormSlice.actions;

export default signinFormSlice.reducer;
