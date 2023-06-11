import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, { payload }: { payload: { [id: string]: string } }) =>
      payload,
  },
});

export const usersAcions = usersSlice.actions;

export default usersSlice.reducer;
