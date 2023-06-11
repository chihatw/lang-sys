import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

import LogoButton from './LogoButton';
import SelectUserPane from './SelectUserPane';
import LogoutButton from './LogoutButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
          <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
            <SelectUserPane />
            <LogoutButton />
          </div>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
