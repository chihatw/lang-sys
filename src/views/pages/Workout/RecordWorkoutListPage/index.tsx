import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import RecordWorkoutListRow from './RecordWorkoutListRow';
import { RootState } from 'main';
import CustomLabel from 'views/components/CustomLabel';
import { recordWorkoutListActions } from 'application/recordWorkoutList/framework/0-reducer';
import { RECORD_WORKOUT_STORAGE_PATH } from 'application/recordWorkouts/core/1-constants';

const RecordWorkoutListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workoutIds, workoutIdsInitializing, audioBuffersInitializing } =
    useSelector((state: RootState) => state.recordWorkoutList);

  // workoutIdsの取得
  useEffect(() => {
    // 初期化が終わっていれば、終了
    if (!workoutIdsInitializing) return;
    dispatch(recordWorkoutListActions.initiate());
  }, [workoutIdsInitializing]);

  // audioBuffersの取得
  useEffect(() => {
    // 初期化が終わっていれば、終了
    if (!audioBuffersInitializing) return;

    // workoutIds が存在しなければ、終了
    if (!workoutIds.length) return;

    const paths = workoutIds.map(
      (workoutId) => RECORD_WORKOUT_STORAGE_PATH + workoutId
    );
    dispatch(recordWorkoutListActions.getAudioBuffersStart({ paths }));
  }, [workoutIds, audioBuffersInitializing]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 80 }}>
        <div style={{ display: 'grid', rowGap: 24 }}>
          <CustomLabel label='練習' />
          {workoutIds.map((workoutId, index) => (
            <RecordWorkoutListRow key={index} workoutId={workoutId} />
          ))}
        </div>
        <Button
          sx={{ color: 'white' }}
          variant='contained'
          onClick={handleBack}
        >
          回到主頁
        </Button>
      </div>
    </Container>
  );
};

export default RecordWorkoutListPage;
