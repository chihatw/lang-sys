import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { authUserActions } from 'application/authUser/framework/0-reducer';

import { useDispatch } from 'react-redux';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authUserActions.signoutInitiate());
  };

  return (
    <IconButton size='small' sx={{ color: 'white' }} onClick={handleSignOut}>
      <LogoutIcon />
    </IconButton>
  );
}

export default LogoutButton;
