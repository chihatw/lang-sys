import { Button, IconButton } from '@mui/material';
import { useMemo } from 'react';

const RecButton = ({
  hasNext,
  isRunning,
  handleClickPlayButton,
}: {
  hasNext: boolean;
  isRunning: boolean;
  handleClickPlayButton: () => void;
}) => {
  const buttonLabel = useMemo(() => {
    if (!isRunning) return '開始錄音';
    if (hasNext) return '下一個';
    return '停止錄音';
  }, [isRunning, hasNext]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button
        color='primary'
        variant='contained'
        onClick={handleClickPlayButton}
        sx={{
          color: 'white',
          width: 120,
          fontSize: 18,
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default RecButton;
