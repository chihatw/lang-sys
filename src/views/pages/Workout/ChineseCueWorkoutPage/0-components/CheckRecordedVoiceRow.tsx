import { PlayArrow, Stop } from '@mui/icons-material';

import { Divider, IconButton } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

import SentencePitchLine from 'views/components/SentencePitchLine';
import { WORKOUT_VOICES } from 'assets/workoutVoice';
import workoutVoice from 'assets/audios/workout.mp3';

function CheckRecordedVoiceRow({ cueId }: { cueId: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      setIsPlaying(false);
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.ontimeupdate = () => {
      if (audio.currentTime < stop) return;

      audio.pause();
      audio.currentTime = start;
      setIsPlaying(false);
    };

    if (audio.paused) {
      audio.currentTime = start;
      audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    audio.currentTime = start;
    setIsPlaying(false);
  };

  return (
    <div style={{ padding: '0 32px' }}>
      <audio ref={audioRef} src={workoutVoice} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0',
        }}
      >
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div style={{ fontFamily: 'serif', color: '#555', fontSize: 12 }}>
            {chinese}
          </div>
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
        </div>
        <IconButton onClick={handlePlay}>
          {isPlaying ? (
            <Stop sx={{ color: '#52a2aa' }} />
          ) : (
            <PlayArrow sx={{ color: '#52a2aa' }} />
          )}
        </IconButton>
      </div>
      <Divider />
    </div>
  );
}

export default CheckRecordedVoiceRow;
