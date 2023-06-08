import { Button, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCENE } from '../../commons';

import { WorkoutState } from '../Model';
import RecordWorkoutPractice from './RecordWorkoutPractice';
import WorkoutOpening from './WorkoutOpening';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../main';

const WorkoutForm = ({
  state,
  dispatch,
}: {
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const navigate = useNavigate();
  const { scene } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );
  const handleBack = () => {
    navigate(`/list/record`);
  };

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        {(() => {
          switch (scene) {
            case SCENE.opening:
              return <WorkoutOpening />;
            case SCENE.practice:
              return (
                <RecordWorkoutPractice state={state} dispatch={dispatch} />
              );
            default:
              throw new Error(`incorrect scene ${scene}`);
          }
        })()}
        <Button variant='outlined' onClick={handleBack}>
          練習結束
        </Button>
      </div>
    </Container>
  );
};

export default WorkoutForm;
