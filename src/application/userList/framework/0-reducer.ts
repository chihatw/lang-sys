import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    initiate: (state, { payload }: { payload: string }) => state,
    setUserIds: (
      state,
      { payload }: { payload: { uids: string[]; selectedUid: string } }
    ) => {
      state.uids = payload.uids;
      state.selectedUid = payload.selectedUid;
    },
    setSelectedUid: (state, { payload }: { payload: string }) => {
      state.selectedUid = payload;
    },
  },
});

export const userListActions = userListSlice.actions;

export default userListSlice.reducer;
