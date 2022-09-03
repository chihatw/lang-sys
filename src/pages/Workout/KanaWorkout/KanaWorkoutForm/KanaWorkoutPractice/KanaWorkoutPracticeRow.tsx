import { Check } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import React from 'react';

const KanaWorkoutPracticeRow = ({
  kana,
  isSelected,
  handleClickRow,
}: {
  kana: string;
  isSelected: boolean;
  handleClickRow: () => void;
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClickRow}
    >
      <div
        style={{
          width: 240,
          display: 'flex',
          borderRadius: 4,
          border: `1px solid ${isSelected ? '#52a2aa' : '#ccc'}`,
          background: isSelected ? 'rgba(82,162,170,0.05)' : '#eee',
        }}
      >
        <div
          style={{
            flexBasis: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isSelected ? '#52a2aa' : '#ccc',
          }}
        >
          <Check />
        </div>
        <div
          style={{
            ...(theme.typography as any).notoSerifJP,
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            fontSize: 24,
            padding: 4,
          }}
        >
          {kana}
        </div>
      </div>
    </div>
  );
};

export default KanaWorkoutPracticeRow;
