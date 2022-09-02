import { useTheme } from '@mui/material';
import React from 'react';

const CustomLabel = ({ label }: { label: string }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        ...(theme.typography as any).mPlusRounded,
        color: '#52a2aa',
        padding: 8,
        fontSize: 14,
        background: '#EAF4F5',
        borderLeft: '8px solid #52a2aa',
        userSelect: 'none',
        borderRadius: 4,
      }}
    >
      {label}
    </div>
  );
};

export default CustomLabel;
