import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import WorkoutListRow from './WorkoutListRow';
import { RootState } from '../../../../main';
import TouchMe from '../../../components/TouchMe';
import CustomLabel from '../../../components/CustomLabel';
import { recordWorkoutListActions } from '../../../../application/recordWorkoutList/framework/0-reducer';

const WorkoutList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { workoutIds, workoutIdsInitializing } = useSelector(
    (state: RootState) => state.recordWorkoutList
  );

  // workoutIdsの取得
  useEffect(() => {
    if (!currentUser) return;
    // 初期化が終わっていれば、終了
    if (!workoutIdsInitializing) return;
    dispatch(recordWorkoutListActions.getList({ uid: currentUser.uid }));
  }, [currentUser, workoutIdsInitializing]);

  // audioBufferPathsの取得
  useEffect(() => {
    // audioContext がなければ、終了
    if (!audioContext) return;
    // workoutIds が存在しなければ、終了
    if (!workoutIds.length) return;
    dispatch(recordWorkoutListActions.getAudioBufferPaths({ workoutIds }));
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
            <WorkoutListRow key={index} workoutId={workoutId} />
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

export default WorkoutList;
