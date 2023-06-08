import { Card, CardContent } from '@mui/material';
import SentencePitchLine from '../../../../../components/SentencePitchLine';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../main';
import { playAudioBuffer } from '../../../../../../application/audio/core/2-services';

function WorkoutOpeningRow({ cueId }: { cueId: string }) {
  const { audioContext, chenVoice } = useSelector(
    (state: RootState) => state.audio
  );

  const handleClick = () => {
    if (!chenVoice || !audioContext) return;
    playAudioBuffer(cueId, chenVoice, audioContext);
  };

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: -1,
        }}
      >
        <SentencePitchLine pitchStr={cueId} />
      </CardContent>
    </Card>
  );
}

export default WorkoutOpeningRow;
