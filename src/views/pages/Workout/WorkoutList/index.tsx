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
  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { workoutIds } = useSelector(
    (state: RootState) => state.recordWorkoutList
  );

  // todo workoutIds と audioBufferPaths を分けて取得？
  useEffect(() => {
    // audioContext がなければ、終了
    if (!audioContext) return;
    // workoutIds が存在すれば、終了
    if (workoutIds.length) return;

    dispatch(recordWorkoutListActions.initiate());
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
