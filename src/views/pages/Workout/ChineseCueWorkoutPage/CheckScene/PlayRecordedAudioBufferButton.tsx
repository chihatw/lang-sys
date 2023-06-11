import { PlayArrow, Stop } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audio/core/2-services';
import { RootState } from 'main';

function PlayRecordedAudioBufferButton() {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { userAudioBuffer } = useSelector((state: RootState) => state.audio);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      pauseSourceNode(sourceNodeRef);
      setIsPlaying(false);
    };
  }, []);

  const play = () => {
    if (isPlaying) {
      setIsPlaying(false);
      pauseSourceNode(sourceNodeRef);
      return;
    }
    setIsPlaying(true);
    playAudioBufferAndSetSourceNode(
      userAudioBuffer!,
      0,
      userAudioBuffer!.duration,
      sourceNodeRef,
      () => setIsPlaying(false)
    );
  };

  return (
    <IconButton
      sx={{ color: '#52a2aa' }}
      onClick={play}
      disabled={!userAudioBuffer}
    >
      {isPlaying ? (
        <Stop sx={{ fontSize: 120 }} />
      ) : (
        <PlayArrow sx={{ fontSize: 120 }} />
      )}
    </IconButton>
  );
}

export default PlayRecordedAudioBufferButton;
