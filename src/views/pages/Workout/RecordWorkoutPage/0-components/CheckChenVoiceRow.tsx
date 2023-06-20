import { PlayArrow } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { getStartAndStopFromChenSanVoices } from 'application/audio/core/2-services';

import SentencePitchLine from 'views/components/SentencePitchLine';

const CheckChenVoiceRow = ({ pitchStr }: { pitchStr: string }) => {
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

  const handlePlay = () => {
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
