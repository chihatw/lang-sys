import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { RootState } from 'main';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { CHIN_SAN_VOICES2 } from 'assets/chinSanVoices2';
import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audio/core/2-services';

function PlayChineseCueCard({ cueId }: { cueId: string }) {
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const { chenVoice2 } = useSelector((state: RootState) => state.audio);

  const { start, stop, pitchStr, chinese, japanese } = useMemo(() => {
    const target = CHIN_SAN_VOICES2[cueId];
    if (!target)
      return { start: 0, stop: 0, pitchStr: '', chinese: '', japanese: '' };
    return target;
  }, [cueId]);

  useEffect(() => {
    return () => pauseSourceNode(sourceNodeRef);
  }, []);

  const handleClick = () => {
    playAudioBufferAndSetSourceNode(chenVoice2!, start, stop, sourceNodeRef);
  };

  if (!chenVoice2) return <></>;

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
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
