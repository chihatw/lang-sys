import { Button, IconButton } from '@mui/material';

const RecButton = ({
  hasNext,
  isRunning,
  handleClickPlayButton,
}: {
  hasNext: boolean;
  isRunning: boolean;
  handleClickPlayButton: () => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <IconButton color='primary' onClick={handleClickPlayButton}>
        <IconSwitch hasNext={hasNext} isRunning={isRunning} />
      </IconButton>
    </div>
  );
};

export default RecButton;

const IconSwitch = ({
  isRunning,
  hasNext,
}: {
  isRunning: boolean;
  hasNext: boolean;
}) => {
  if (!isRunning) {
    return (
      <div
        style={{
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant='contained' sx={{ color: 'white', fontSize: 18 }}>
          開始錄音
        </Button>
      </div>
    );
  }
  if (hasNext) {
    return (
      <div
        style={{
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant='contained' sx={{ color: 'white', fontSize: 18 }}>
          下一個
        </Button>
      </div>
    );
  }
  return (
    <div
      style={{
        height: 120,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button variant='contained' sx={{ color: 'white', fontSize: 18 }}>
        停止錄音
      </Button>
    </div>
  );
};
