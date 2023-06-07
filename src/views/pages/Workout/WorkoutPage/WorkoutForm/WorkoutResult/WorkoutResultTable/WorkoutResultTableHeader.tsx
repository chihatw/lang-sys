import { useTheme } from '@mui/material';
import React from 'react';

const WorkoutResultTableHeader = () => {
  const theme = useTheme();
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: 80 }} />
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          flexBasis: 180,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 14,
          color: '#aaa',
        }}
      >
        播放
      </div>
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          flexBasis: 180,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 14,
          color: '#aaa',
        }}
      >
        回答
      </div>
    </div>
  );
};

export default WorkoutResultTableHeader;
