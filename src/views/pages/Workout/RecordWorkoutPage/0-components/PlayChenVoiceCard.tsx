import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { RootState } from '../../../../../main';
import SentencePitchLine from '../../../../components/SentencePitchLine';

import {
  getStartAndStopFromChenSanVoices,
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from '../../../../../application/audio/core/2-services';

function PlayChenVoiceCard({ pitchStr }: { pitchStr: string }) {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { audioContext, chenVoice } = useSelector(
    (state: RootState) => state.audio
  );

  const { start, stop } = useMemo(
    () => getStartAndStopFromChenSanVoices(pitchStr),
    [pitchStr]
  );

  useEffect(() => {
    return () => pauseSourceNode(sourceNodeRef);
  }, []);

  const handleClick = () => {
    playAudioBufferAndSetSourceNode(
      chenVoice!,
      audioContext!,
      start,
      stop,
      sourceNodeRef
    );
  };

  if (!chenVoice || !audioContext) return <></>;

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: -1,
          justifyContent: 'center',
        }}
      >
        <SentencePitchLine pitchStr={pitchStr} />
      </CardContent>
    </Card>
  );
}

export default PlayChenVoiceCard;
