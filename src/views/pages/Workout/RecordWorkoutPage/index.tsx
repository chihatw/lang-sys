import { useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../main';
import { recordWorkoutPracticeActions } from '../../../../application/recordWorkoutPractice/framework/0-reducer';

import { SCENE } from '../../../../application/recordWorkoutPractice/core/1-constants';
import OpeningScene from './OpeningScene';
import PracticeScene from './PracticeScene';
import CheckScene from './CheckScene';

const RecordWorkoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workoutId: paramWorkoutId } = useParams();

  const { scene } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  /**
   * state を初期化
   * chenVoice を audio に設定
   * workout が recordWorkouts になければ fetch
   * chenVoice、workout が設定されてから、workoutId と shuffledCueIds を設定
   */
  useEffect(() => {
    if (!paramWorkoutId) return;
    dispatch(
      recordWorkoutPracticeActions.initiate({
        workoutId: paramWorkoutId,
      })
    );
  }, [paramWorkoutId]);

  const handleBack = () => {
    navigate(`/list/record`);
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
};

export default RecordWorkoutPage;
