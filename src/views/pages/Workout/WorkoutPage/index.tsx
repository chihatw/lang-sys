import { useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TouchMe from '../../../components/TouchMe';
import { RootState } from '../../../../main';
import { recordWorkoutPracticeActions } from '../../../../application/recordWorkoutPractice/framework/0-reducer';

import WorkoutOpening from './WorkoutOpening';
import RecordWorkoutPractice from './RecordWorkoutPractice';
import { SCENE } from '../../../../application/recordWorkoutPractice/core/1-constants';

const WorkoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workoutId: paramWorkoutId } = useParams();

  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { scene } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  /**
   * state を初期化
   * chenVoice を autio に設定
   * workout が recordWorkouts になければ fetch
   * chenVoice、workout が設定されてから、workoutId と shuffledCueIds を設定
   */
  useEffect(() => {
    if (!paramWorkoutId) return;
    if (!audioContext) return;
    dispatch(
      recordWorkoutPracticeActions.initiate({
        workoutId: paramWorkoutId,
      })
    );
  }, [paramWorkoutId, audioContext]);

  const handleBack = () => {
    navigate(`/list/record`);
  };

  if (!audioContext) return <TouchMe />;

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        {scene === SCENE.opening ? (
          <WorkoutOpening />
        ) : (
          <RecordWorkoutPractice />
        )}
        <Button variant='outlined' onClick={handleBack}>
          練習結束
        </Button>
      </div>
    </Container>
  );
};

export default WorkoutPage;
