import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { userListActions } from 'application/userList/framework/0-reducer';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from 'application/userList/core/1-constants';

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
    const currentUid = localStorage.getItem(LOCAL_STORAGE_KEY) || loginUser.uid;
    dispatch(userListActions.initiate(currentUid));
  }, [uids, loginUser]);

  if (!loginUser || loginUser.uid !== import.meta.env.VITE_ADMIN_UID)
    return <></>;

  return (
    <Select
      sx={{ color: 'white' }}
      value={selectedUid}
      variant='standard'
      onChange={(e) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, e.target.value);
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
