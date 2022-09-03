import { PlayArrowRounded } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import React from 'react';

const KanaWorkoutResultTableCell = ({
  kana,
  isIncorrect,
  handleClick,
}: {
  kana: string;
  isIncorrect?: boolean;
  handleClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        ...(theme.typography as any).notoSerifJP,
        fontSize: 24,
        flexBasis: 180,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        justifyContent: 'center',
        background: isIncorrect ? 'rgba(255,0,0,0.1)' : 'transparent',
      }}
    >
      <div>{kana}</div>
      <IconButton color='primary' onClick={handleClick}>
        <PlayArrowRounded />
      </IconButton>
    </div>
  );
};

export default KanaWorkoutResultTableCell;
