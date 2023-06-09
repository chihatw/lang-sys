import { useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TouchMe from '../../../components/TouchMe';
import { RootState } from '../../../../main';
import { recordWorkoutPracticeActions } from '../../../../application/recordWorkoutPractice/framework/0-reducer';

import OpeningScene from './OpeningScene';
import PracticeScene from './PracticeScene';
import { SCENE } from '../../../../application/recordWorkoutPractice/core/1-constants';

const RecordWorkoutPage = () => {
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
    if (!audioContext) return; // chenVoice の AudioBuffer 作成のために必要
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
        {scene === SCENE.opening ? <OpeningScene /> : <PracticeScene />}
        <Button variant='outlined' onClick={handleBack}>
          練習結束
        </Button>
      </div>
    </Container>
  );
};

export default RecordWorkoutPage;
