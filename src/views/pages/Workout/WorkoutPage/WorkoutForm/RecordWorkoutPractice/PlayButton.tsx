import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../..';
import { createSourceNode } from '../../../../../../services/utils';

const PlayButton = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const { state } = useContext(AppContext);

  const play = () => {
    if (!state.audioContext) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start();
  };
  return (
    <IconButton sx={{ color: '#52a2aa' }} onClick={play}>
      <PlayArrow sx={{ fontSize: 120 }} />
    </IconButton>
  );
};

export default PlayButton;
