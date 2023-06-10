import { PlayArrow } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Divider, IconButton } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { RootState } from '../../../../../main';

import {
  pauseSourceNode,
  getStartAndStopFromChenSanVoices,
  playAudioBufferAndSetSourceNode,
} from '../../../../../application/audio/core/2-services';

import SentencePitchLine from '../../../../components/SentencePitchLine';

const CheckChenVoiceRow = ({ pitchStr }: { pitchStr: string }) => {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { chenVoice } = useSelector((state: RootState) => state.audio);

  const { start, stop } = useMemo(
    () => getStartAndStopFromChenSanVoices(pitchStr),
    [pitchStr]
  );

  useEffect(() => {
    return () => pauseSourceNode(sourceNodeRef);
  }, []);

  const handlePlay = () => {
    playAudioBufferAndSetSourceNode(chenVoice!, start, stop, sourceNodeRef);
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
        <SentencePitchLine pitchStr={pitchStr} />
        <IconButton onClick={handlePlay}>
          <PlayArrow sx={{ color: '#52a2aa' }} />
        </IconButton>
      </div>
      <Divider />
    </div>
  );
};

export default CheckChenVoiceRow;
