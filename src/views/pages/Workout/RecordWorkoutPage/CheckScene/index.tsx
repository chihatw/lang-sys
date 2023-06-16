import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main';

import CheckChenVoiceRow from '../0-components/CheckChenVoiceRow';
import PlayRecordedAudioBufferButton from './PlayRecordedAudioBufferButton';
import { recordWorkoutPracticeActions } from 'application/recordWorkoutPractice/framework/0-reducer';
import { RECORD_WORKOUT_STORAGE_PATH } from 'application/recordWorkouts/core/1-constants';
import { audioActions } from 'application/audio/framework/0-reducer';

function CheckScene() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recordedBlob, recordedAudioBuffer } = useSelector(
    (state: RootState) => state.audio
  );
  const { shuffledCueIds, workoutId } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  const abandonRecordedAudioBuffer = () => {
    dispatch(recordWorkoutPracticeActions.abandomAudioBuffer());
  };

  const saveRecordedAudioBuffer = async () => {
    if (!recordedBlob || !recordedAudioBuffer) return;

    // storage に blob を upload
    // audioBuffers に audioBuffer をセット
    // recordWorkout の state を初期化
    const path = RECORD_WORKOUT_STORAGE_PATH + workoutId;
    dispatch(
      audioActions.saveAudioBuffer({ path, audioBuffer: recordedAudioBuffer })
    );
    dispatch(recordWorkoutPracticeActions.clearState());
    navigate('/list/record');
  };

  return (
    <div
      style={{
        display: 'grid',
        rowGap: 8,
      }}
    >
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
        <PlayRecordedAudioBufferButton />
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
            <CheckChenVoiceRow key={index} pitchStr={pitchStr} />
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
    </div>
  );
}

export default CheckScene;
