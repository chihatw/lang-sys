import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { RootState } from 'main';
import SentencePitchLine from 'views/components/SentencePitchLine';

import {
  getStartAndStopFromChenSanVoices,
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audio/core/2-services';

function PlayChenVoiceCard({ pitchStr }: { pitchStr: string }) {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { chenVoice } = useSelector((state: RootState) => state.audio);

  const { start, stop } = useMemo(
    () => getStartAndStopFromChenSanVoices(pitchStr),
    [pitchStr]
  );

  useEffect(() => {
    return () => pauseSourceNode(sourceNodeRef);
  }, []);

  const handleClick = () => {
    playAudioBufferAndSetSourceNode(chenVoice!, start, stop, sourceNodeRef);
  };

  if (!chenVoice) return <></>;

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
