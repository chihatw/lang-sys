import { useTheme } from '@mui/material';
import CueCard from './CueCard';
import RecButton from './RecButton';
import CheckPane from './CheckPane';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../main';
import { recordWorkoutPracticeActions } from '../../../../../application/recordWorkoutPractice/framework/0-reducer';

const CUE_CARD_HEIGHT = 200;
const PracticeScene = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { blob, isRunning, audioBuffer, currentIndex, shuffledCueIds } =
    useSelector((state: RootState) => state.recordWorkoutPractice);

  const pitchStr = shuffledCueIds[currentIndex];

  const abandonRecordedAudioBuffer = () => {
    dispatch(recordWorkoutPracticeActions.abandomAudioBuffer());
  };

  const saveRecordedAudioBuffer = async () => {
    if (!blob || !audioBuffer) return;

    // storage に blob を upload
    // audioBuffers に audioBuffer をセット
    // recordWorkout の state を初期化
    dispatch(recordWorkoutPracticeActions.saveAudioBuffer());
    navigate('/list/record');
  };

  return (
    <div
      style={{
        ...(theme.typography as any).notoSerifJP,
        display: 'grid',
        rowGap: 8,
      }}
    >
      {/* currentIndex/total */}
      <div style={{ fontSize: 48, textAlign: 'center', color: '#aaa' }}>{`${
        currentIndex + 1
      }/${shuffledCueIds.length}`}</div>

      {/* CueCard */}
      <div style={{ height: CUE_CARD_HEIGHT }}>
        {isRunning && <CueCard pitchStr={pitchStr} height={CUE_CARD_HEIGHT} />}
      </div>

      {/* button */}
      <RecButton />

      {/* todo これシーン分ける？ */}
      {!!audioBuffer && !!audioContext && (
        <CheckPane
          saveRecordedAudioBuffer={saveRecordedAudioBuffer}
          abandonRecordedAudioBuffer={abandonRecordedAudioBuffer}
        />
      )}
    </div>
  );
};

export default PracticeScene;
