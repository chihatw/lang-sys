import { PlayArrow } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../..';

import { TYPE } from '../../../commons';
import SentencePitchLine from '../../../../../components/SentencePitchLine';
import { playAudioBuffer } from '../../../../../../application/audio/core/2-services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../main';

const CheckPaneRow = ({
  cue,
  audioBuffer,
}: {
  cue: { id: string; pitchStr: string };
  audioBuffer: AudioBuffer;
}) => {
  const { state } = useContext(AppContext);

  const { audioContext } = useSelector((state: RootState) => state.audio);

  const handlePlay = () => {
    if (!audioContext) return;
    playAudioBuffer(cue.id, audioBuffer, audioContext);
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
