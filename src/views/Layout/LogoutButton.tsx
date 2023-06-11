import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { authUserActions } from 'application/authUser/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';

function LogoutButton() {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state: RootState) => state.authUser);

  const handleSignOut = () => {
    dispatch(authUserActions.signoutInitiate());
  };
  if (!loginUser) return <></>;

  return (
    <IconButton size='small' sx={{ color: 'white' }} onClick={handleSignOut}>
      <LogoutIcon />
    </IconButton>
  );
}

export default LogoutButton;
