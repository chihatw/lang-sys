import { Button, Container, Modal } from '@mui/material';
import CheckPaneRow from './CheckPaneRow';
import PlayButton from './PlayButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../main';

const CheckPane = ({
  saveRecordedAudioBuffer,
  abandonRecordedAudioBuffer,
}: {
  saveRecordedAudioBuffer: () => void;
  abandonRecordedAudioBuffer: () => void;
}) => {
  const { chenVoice } = useSelector((state: RootState) => state.audio);
  const { shuffledCueIds, isChecking, audioBuffer } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  return (
    <Modal open={isChecking}>
      <div
        style={{
          width: '100vw',
          minHeight: '100vh',
          background: '#fafafa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container maxWidth='sm'>
          <div
            style={{
              color: '#52a2aa',
              textAlign: 'center',
              padding: '8px 0',
              userSelect: 'none',
            }}
          >
            請確認錄音
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PlayButton audioBuffer={audioBuffer!} />
          </div>
          <div
            style={{
              display: 'grid',
              rowGap: 8,
              height: 320,
              overflowY: 'scroll',
              background: 'white',
              borderRadius: 8,
            }}
          >
            <div style={{ padding: '24px 0' }}>
              {shuffledCueIds.map((pitchStr, index) => (
                <CheckPaneRow
                  key={index}
                  pitchStr={pitchStr}
                  audioBuffer={chenVoice!}
                />
              ))}
            </div>
            <div style={{ display: 'grid', rowGap: 16 }}>
              <Button
                onClick={abandonRecordedAudioBuffer}
                variant='outlined'
                color='primary'
              >
                再一次錄音
              </Button>
              <Button
                onClick={saveRecordedAudioBuffer}
                variant='contained'
                color='primary'
                sx={{ color: 'white' }}
              >
                發音都正確
              </Button>
            </div>
            <div style={{ height: 180 }} />
          </div>
        </Container>
      </div>
    </Modal>
  );
};

export default CheckPane;
