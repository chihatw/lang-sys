import { useMemo } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main';
import { chineseCueWorkoutPracticeActions } from 'application/chineseCueWorkoutPractice/framework/0-reducer';
import PlayChineseCueCard from '../0-components/PlayChineseCueCard';

function OpeningScene() {
  const dispatch = useDispatch();
  const { workoutId } = useSelector(
    (state: RootState) => state.chineseCueWorkoutPractice
  );
  const workout = useSelector(
    (state: RootState) => state.chineseCueWorkouts[workoutId] || null
  );

  const handleNext = () => {
    dispatch(chineseCueWorkoutPracticeActions.startPractice());
  };

  if (!workout) return <></>;

  return (
    <div style={{ display: 'grid', rowGap: 48 }}>
      <div style={{ fontFamily: 'serif', color: '#555' }}>
        {workout.cueIds.length > 1 ? '請點觸各個聲音，確認差異' : '請確認聲音'}
      </div>
      <div style={{ display: 'grid', rowGap: 16 }}>
        {workout.cueIds.map((cueId, index) => (
          <PlayChineseCueCard key={index} cueId={cueId} />
        ))}
      </div>
      <Button variant='contained' sx={{ color: 'white' }} onClick={handleNext}>
        開始練習
      </Button>
    </div>
  );
}

export default OpeningScene;
