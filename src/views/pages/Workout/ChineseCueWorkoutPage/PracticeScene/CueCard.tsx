import { useMemo } from 'react';
import { CHIN_SAN_VOICES2 } from 'assets/chinSanVoices2';

function CueCard({ cueId, height }: { cueId: string; height: number }) {
  const { chinese } = useMemo(() => {
    const target = CHIN_SAN_VOICES2[cueId];
    if (!target)
      return { start: 0, stop: 0, pitchStr: '', chinese: '', japanese: '' };
    return target;
  }, [cueId]);
  return (
    <div
      style={{
        display: 'flex',
        height,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {chinese}
    </div>
  );
}

export default CueCard;
