import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { auth } from '../repositories/firebase';
import LogoButton from './LogoButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppContext);
  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <AppBar
        elevation={0}
        position='relative'
        sx={{
          backgroundColor: '#52a2aa',
          backgroundImage:
            'repeating-linear-gradient(135deg,transparent,transparent 10px,rgba(86, 171, 179, 1) 10px,rgba(86, 171, 179, 1) 20px)',
        }}
      >
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          <LogoButton />
          {state.user && (
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
