import { useTheme } from '@mui/material';
import CueCard from './CueCard';
import RecButton from './RecButton';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../main';

const CUE_CARD_HEIGHT = 200;
const PracticeScene = () => {
  const theme = useTheme();
  const { isRunning, currentIndex, shuffledCueIds } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  const pitchStr = shuffledCueIds[currentIndex];

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
    </div>
  );
};

export default PracticeScene;
