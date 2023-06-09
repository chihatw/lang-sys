import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../main';
import { chineseCueWorkoutListActions } from '../../../../application/chineseCueWorkoutList/framework/0-reducer';
import TouchMe from '../../../components/TouchMe';
import CustomLabel from '../../../components/CustomLabel';
import ChineseCueWorkoutListRow from './ChineseCueWorkoutListRow';
import { CHINESE_CUE_WORKOUT_STORAGE_PATH } from '../../../../application/chineseCueWorkouts/core/1-constants';

function ChineseWorkoutListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { workoutIds, workoutIdsInitializing } = useSelector(
    (state: RootState) => state.chineseCueWorkoutList
  );

  // workoutIds の取得
  useEffect(() => {
    // 初期化が終わっていれば、終了
    if (!workoutIdsInitializing) return;
    dispatch(
      chineseCueWorkoutListActions.getListStart({ uid: currentUser!.uid })
    );
  }, [currentUser, workoutIdsInitializing]);

  // audioBuffersの取得
  useEffect(() => {
    // audioContext がなければ、終了
    if (!audioContext) return;
    // workoutIds が存在しなければ、終了
    if (!workoutIds.length) return;
    const paths = workoutIds.map(
      (workoutId) => CHINESE_CUE_WORKOUT_STORAGE_PATH + workoutId
    );
    dispatch(chineseCueWorkoutListActions.getAudioBuffersStart({ paths }));
  }, [workoutIds, audioContext]);

  const handleBack = () => {
    navigate('/');
  };

  if (!audioContext) return <TouchMe />;

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 80 }}>
        <div style={{ display: 'grid', rowGap: 24 }}>
          <CustomLabel label='練習' />
          {workoutIds.map((workoutId, index) => (
            <ChineseCueWorkoutListRow key={index} workoutId={workoutId} />
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
}

export default ChineseWorkoutListPage;
