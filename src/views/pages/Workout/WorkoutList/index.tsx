import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import WorkoutListRow from './WorkoutListRow';
import { RootState } from '../../../../main';
import TouchMe from '../../../components/TouchMe';
import CustomLabel from '../../../components/CustomLabel';
import { recordWorkoutsActions } from '../../../../application/recordWorkouts/framework/0-reducer';

const WorkoutList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { workouts, audioBuffers } = useSelector(
    (state: RootState) => state.recordWorkouts
  );

  useEffect(() => {
    // audioContext がなければ、終了
    if (!audioContext) return;
    // workouts が存在すれば、終了
    if (Object.keys(workouts).length) return;

    dispatch(recordWorkoutsActions.fetchRecordWorkoutsStart());
  }, [workouts, audioContext]);

  const handleBack = () => {
    navigate('/');
  };

  if (!audioContext) return <TouchMe />;

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 80 }}>
        <div style={{ display: 'grid', rowGap: 24 }}>
          <CustomLabel label='練習' />
          {Object.values(workouts)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((workout, index) => (
              <WorkoutListRow
                key={index}
                workout={workout}
                audioBuffer={audioBuffers[workout.id]}
              />
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
