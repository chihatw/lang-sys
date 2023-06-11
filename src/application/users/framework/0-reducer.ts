import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    concatUsers: (
      state,
      { payload }: { payload: { [id: string]: string } }
    ) => ({
      ...state,
      ...payload,
    }),
  },
});

export const usersAcions = usersSlice.actions;

export default usersSlice.reducer;
