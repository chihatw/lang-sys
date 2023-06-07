import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { createSourceNode } from '../../../../../../application/audio/core/2-services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../main';

const PlayButton = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const { audioContext } = useSelector((state: RootState) => state.audio);

  const play = () => {
    if (!audioContext) return;
    const sourceNode = createSourceNode(audioBuffer, audioContext);
    sourceNode.start();
  };
  return (
    <IconButton sx={{ color: '#52a2aa' }} onClick={play}>
      <PlayArrow sx={{ fontSize: 120 }} />
    </IconButton>
  );
};

export default PlayButton;
