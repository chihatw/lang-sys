import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { PlayArrow } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../../../../App';
import { playAudioBuffer } from '../../../../../services/utils';
import { TYPE } from '../../../commons';

const CheckPaneRow = ({
  cue,
  audioBuffer,
}: {
  cue: { id: string; pitchStr: string };
  audioBuffer: AudioBuffer;
}) => {
  const { state } = useContext(AppContext);
  const [pitchesArray, setPitchesArray] = useState<string[][][]>([]);

  useEffect(() => {
    const pitchesArray = string2PitchesArray(cue.pitchStr);
    setPitchesArray(pitchesArray);
  }, [cue.pitchStr]);

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
        <SentencePitchLine pitchesArray={pitchesArray} />
        <IconButton onClick={handlePlay}>
          <PlayArrow sx={{ color: '#52a2aa' }} />
        </IconButton>
      </div>
      <Divider />
    </div>
  );
};

export default CheckPaneRow;
