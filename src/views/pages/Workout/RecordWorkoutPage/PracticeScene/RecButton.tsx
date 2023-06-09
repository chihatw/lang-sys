import { Button, IconButton } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../main';

const RecButton = ({
  handleClickPlayButton,
}: {
  handleClickPlayButton: () => void;
}) => {
  const { currentIndex, shuffledCueIds, isRunning } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  const buttonLabel = useMemo(() => {
    if (!isRunning) return '開始錄音';
    if (currentIndex + 1 !== shuffledCueIds.length) return '下一個';
    return '停止錄音';
  }, [isRunning, currentIndex, shuffledCueIds]);

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
