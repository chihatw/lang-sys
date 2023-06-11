import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audio/core/2-services';
import { RootState } from 'main';

const PlayRecordedAudioBufferButton = () => {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { userAudioBuffer } = useSelector((state: RootState) => state.audio);

  useEffect(() => {
    return () => pauseSourceNode(sourceNodeRef);
  }, []);

  const play = () => {
    playAudioBufferAndSetSourceNode(
      userAudioBuffer!,
      0,
      userAudioBuffer!.duration,
      sourceNodeRef
    );
  };
  return (
    <IconButton
      sx={{ color: '#52a2aa' }}
      onClick={play}
      disabled={!userAudioBuffer}
    >
      <PlayArrow sx={{ fontSize: 120 }} />
    </IconButton>
  );
};

export default PlayRecordedAudioBufferButton;
