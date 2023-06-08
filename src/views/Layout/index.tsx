import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import React from 'react';

import LogoButton from './LogoButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main';
import { userActions } from '../../application/user/framework/0-reducer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const handleSignOut = () => {
    dispatch(userActions.signoutInitiate());
  };
  return (
    <div>
      <AppBar
        elevation={0}
        position='sticky'
        sx={{
          backgroundColor: '#52a2aa',
          backgroundImage:
            'repeating-linear-gradient(135deg,transparent,transparent 10px,rgba(86, 171, 179, 1) 10px,rgba(86, 171, 179, 1) 20px)',
        }}
      >
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          <LogoButton />
          {currentUser && (
            <IconButton
              size='small'
              sx={{ color: 'white' }}
              onClick={handleSignOut}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;