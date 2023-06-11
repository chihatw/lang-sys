import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { userListActions } from 'application/userList/framework/0-reducer';

function SelectUserPane() {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state: RootState) => state.authUser);
  const { initializing, uids, selectedUid } = useSelector(
    (state: RootState) => state.userList
  );

  const users = useSelector((state: RootState) => state.users);

  // userIds の取得
  useEffect(() => {
    if (!initializing) return;
    dispatch(userListActions.initiate());
  }, [initializing]);

  if (!loginUser || loginUser.uid !== import.meta.env.VITE_ADMIN_UID)
    return <></>;

  return (
    <Select
      sx={{ color: 'white' }}
      value={selectedUid}
      variant='standard'
      onChange={(e) => dispatch(userListActions.setSelectedUid(e.target.value))}
      disableUnderline
    >
      {uids.map((uid, index) => (
        <MenuItem value={uid} key={index}>
          <div>{users[uid]}</div>
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectUserPane;
