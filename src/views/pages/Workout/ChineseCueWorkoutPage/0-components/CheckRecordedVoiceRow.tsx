import { PlayArrow, Stop } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Divider, IconButton } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

import { RootState } from 'main';

import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audio/core/2-services';

import SentencePitchLine from 'views/components/SentencePitchLine';
import { CHIN_SAN_VOICES2 } from 'assets/chinSanVoices2';

function CheckRecordedVoiceRow({ cueId }: { cueId: string }) {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { chenVoice2 } = useSelector((state: RootState) => state.audio);
  const [isPlaying, setIsPlaying] = useState(false);

  const { start, stop, pitchStr, chinese, japanese } = useMemo(() => {
    const target = CHIN_SAN_VOICES2[cueId];
    if (!target)
      return { start: 0, stop: 0, pitchStr: '', chinese: '', japanese: '' };
    return target;
  }, [cueId]);

  useEffect(() => {
    return () => {
      pauseSourceNode(sourceNodeRef);
      setIsPlaying(false);
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      pauseSourceNode(sourceNodeRef);
      return;
    }
    setIsPlaying(true);
    playAudioBufferAndSetSourceNode(
      chenVoice2!,
      start,
      stop,
      sourceNodeRef,
      () => setIsPlaying(false)
    );
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
