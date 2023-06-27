import { Card, CardContent } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import workoutVoice from 'assets/audios/workout.mp3';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { WORKOUT_VOICES } from 'assets/workoutVoice';

function PlayChineseCueCard({ cueId }: { cueId: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { start, stop, pitchStr, chinese, japanese } = useMemo(() => {
    const target = WORKOUT_VOICES[cueId];
    if (!target)
      return { start: 0, stop: 0, pitchStr: '', chinese: '', japanese: '' };
    return target;
  }, [cueId]);

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
      <audio ref={audioRef} src={workoutVoice} />
      <CardContent
        sx={{
          marginBottom: -1,
          display: 'grid',
          rowGap: 1,
        }}
      >
        <div style={{ fontFamily: 'serif', color: '#555' }}>{chinese}</div>
        <div>
          <SentencePitchLine pitchStr={pitchStr} />
          <div
            style={{
              fontFamily: 'serif',
              color: '#555',
              fontSize: 8,
              paddingLeft: '0.5em',
            }}
          >
            {japanese}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayChineseCueCard;
