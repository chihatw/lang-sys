import { Card, CardContent } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import SentencePitchLine from 'views/components/SentencePitchLine';

import { getStartAndStopFromChenSanVoices } from 'application/audio/core/2-services';

function PlayChenVoiceCard({ pitchStr }: { pitchStr: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { start, stop } = useMemo(
    () => getStartAndStopFromChenSanVoices(pitchStr),
    [pitchStr]
  );

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
    };
  }, []);

  const handleClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.ontimeupdate = () => {
      if (audio.currentTime < stop) return;
      audio.pause();
      audio.currentTime = start;
    };

    if (audio.paused) {
      audio.currentTime = start;
      audio.play();
      return;
    }

    audio.pause();
    audio.currentTime = start;
  };

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
