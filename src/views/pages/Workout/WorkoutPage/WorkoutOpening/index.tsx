import { useMemo } from 'react';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../main';
import { recordWorkoutPracticeActions } from '../../../../../application/recordWorkoutPractice/framework/0-reducer';
import WorkoutOpeningRow from './WorkoutOpeningRow';
import { SCENE } from '../../../../../application/recordWorkoutPractice/core/1-constants';

const WorkoutOpening = () => {
  const dispatch = useDispatch();
  const { workoutId } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );
  const { recordWorkouts } = useSelector((state: RootState) => state);

  const workout = useMemo(
    () => recordWorkouts[workoutId] || null,
    [workoutId, recordWorkouts]
  );

  const handleNext = () => {
    dispatch(recordWorkoutPracticeActions.setScene(SCENE.practice));
  };

  if (!workout) return <></>;

  return (
    <div style={{ display: 'grid', rowGap: 48 }}>
      <div style={{ fontFamily: 'serif', color: '#555' }}>
        {workout.cueIds.length > 1 ? '請點觸各個聲音，確認差異' : '請確認聲音'}
      </div>
      <div style={{ display: 'grid', rowGap: 16 }}>
        {workout.cueIds.map((cueId, index) => (
          <WorkoutOpeningRow key={index} cueId={cueId} />
        ))}
      </div>

      <Button variant='contained' sx={{ color: 'white' }} onClick={handleNext}>
        開始練習
      </Button>
    </div>
  );
};

export default WorkoutOpening;
