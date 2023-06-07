import { PlayArrow } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../..';
import { playAudioBuffer } from '../../../../../../services/utils';
import { TYPE } from '../../../commons';
import SentencePitchLine from '../../../../../components/SentencePitchLine';

const CheckPaneRow = ({
  cue,
  audioBuffer,
}: {
  cue: { id: string; pitchStr: string };
  audioBuffer: AudioBuffer;
}) => {
  const { state } = useContext(AppContext);

  const handlePlay = () => {
    if (!state.audioContext) return;
    playAudioBuffer(TYPE.record, cue.id, audioBuffer, state.audioContext);
  };

  return (
    <div style={{ padding: '0 32px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0',
        }}
      >
        <SentencePitchLine pitchStr={cue.pitchStr} />
        <IconButton onClick={handlePlay}>
          <PlayArrow sx={{ color: '#52a2aa' }} />
        </IconButton>
      </div>
      <Divider />
    </div>
  );
};

export default CheckPaneRow;
