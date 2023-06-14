import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main';
import { chineseCueWorkoutPracticeActions } from 'application/chineseCueWorkoutPractice/framework/0-reducer';
import PlayRecordedAudioBufferButton from './PlayRecordedAudioBufferButton';
import CheckRecordedVoiceRow from '../0-components/CheckRecordedVoiceRow';
import { audioActions } from 'application/audio/framework/0-reducer';
import { CHINESE_CUE_WORKOUT_STORAGE_PATH } from 'application/chineseCueWorkouts/core/1-constants';

function CheckScene() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blob, userAudioBuffer } = useSelector(
    (state: RootState) => state.audio
  );
  const { shuffledCueIds, workoutId } = useSelector(
    (state: RootState) => state.chineseCueWorkoutPractice
  );

  const abandonRecordedAudioBuffer = () => {
    dispatch(chineseCueWorkoutPracticeActions.abandomAudioBuffer());
  };

  const saveRecordedAudioBuffer = async () => {
    if (!blob || !userAudioBuffer) return;

    // storage に blob を upload
    // audioBuffers に audioBuffer をセット
    const path = CHINESE_CUE_WORKOUT_STORAGE_PATH + workoutId;
    dispatch(
      audioActions.saveAudioBuffer({ path, audioBuffer: userAudioBuffer })
    );
    dispatch(chineseCueWorkoutPracticeActions.clearState());
    navigate('/list/chineseCue');
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
          background: 'white',
          borderRadius: 8,
        }}
      >
        <div style={{ padding: '24px 0' }}>
          {shuffledCueIds.map((cueId, index) => (
            <CheckRecordedVoiceRow key={index} cueId={cueId} />
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
        {/* <div style={{ height: 180 }} /> */}
      </div>
    </div>
  );
}

export default CheckScene;
