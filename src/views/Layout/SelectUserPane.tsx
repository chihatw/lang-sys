import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { userListActions } from 'application/userList/framework/0-reducer';
import {
  getSelectedUidFromLocalStorage,
  setSelectedUidToLocalStorage,
} from 'application/userList/core/2-services';
import { useNavigate } from 'react-router-dom';

function SelectUserPane() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser } = useSelector((state: RootState) => state.authUser);
  const { uids, selectedUid } = useSelector(
    (state: RootState) => state.userList
  );

  const users = useSelector((state: RootState) => state.users);

  // userIds の取得
  useEffect(() => {
    if (!loginUser) return;
    if (!!uids.length) return; // 初期化されていれば、終了（uids は初期化後に必ず存在する）
    const selectedUid = getSelectedUidFromLocalStorage(loginUser);
    dispatch(userListActions.initiate(selectedUid));
  }, [uids, loginUser]);

  if (!loginUser || loginUser.uid !== import.meta.env.VITE_ADMIN_UID)
    return <></>;

  return (
    <Select
      sx={{ color: 'white' }}
      value={selectedUid}
      variant='standard'
      onChange={(e) => {
        setSelectedUidToLocalStorage(e.target.value);
        dispatch(userListActions.setSelectedUid(e.target.value));
        navigate('/');
      }}
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
