import { useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main';
import { chineseCueWorkoutPracticeActions } from 'application/chineseCueWorkoutPractice/framework/0-reducer';
import { SCENE } from 'application/recordWorkoutPractice/core/1-constants';
import OpeningScene from './OpeningScene';
import PracticeScene from './PracticeScene';
import CheckScene from './CheckScene';

function ChineseCueWorkoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workoutId: paramWorkoutId } = useParams();

  const { scene } = useSelector(
    (state: RootState) => state.chineseCueWorkoutPractice
  );

  /**
   * state を初期化
   * recordedVoice を audio に設定
   * workout が chineseCueWorkouts になければ fetch
   * recordedVoice、workout が設定されてから、workoutId と shuffledCueIds を設定
   */
  useEffect(() => {
    if (!paramWorkoutId) return;
    dispatch(
      chineseCueWorkoutPracticeActions.initiate({
        workoutId: paramWorkoutId,
      })
    );
  }, [paramWorkoutId]);

  const handleBack = () => {
    navigate(`/list/chineseCue`);
  };

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        {scene === SCENE.opening && <OpeningScene />}
        {scene === SCENE.practice && <PracticeScene />}
        {scene === SCENE.check && <CheckScene />}
        <Button variant='outlined' onClick={handleBack}>
          練習結束
        </Button>
      </div>
    </Container>
  );
}

export default ChineseCueWorkoutPage;