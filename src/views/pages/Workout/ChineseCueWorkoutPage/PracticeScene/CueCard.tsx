import { useMemo } from 'react';
import { WORKOUT_VOICES } from 'assets/workoutVoice';

function CueCard({ cueId, height }: { cueId: string; height: number }) {
  const { chinese } = useMemo(() => {
    const target = WORKOUT_VOICES[cueId];
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
