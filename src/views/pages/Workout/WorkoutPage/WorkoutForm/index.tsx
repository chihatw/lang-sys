import { Button, Container } from '@mui/material';
import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCENE } from '../../commons';

import { WorkoutState } from '../Model';
import RecordWorkoutPractice from './RecordWorkoutPractice';
import WorkoutOpening from './WorkoutOpening';

const WorkoutForm = ({
  state,
  dispatch,
  type,
}: {
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
  type: string;
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/list/${type}`);
  };

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        <WorkoutSceneSwitch state={state} dispatch={dispatch} type={type} />
        <Button variant='outlined' onClick={handleBack}>
          練習結束
        </Button>
      </div>
    </Container>
  );
};

export default WorkoutForm;

const WorkoutSceneSwitch = ({
  state,
  dispatch,
  type,
}: {
  state: WorkoutState;
  dispatch: Dispatch<WorkoutState>;
  type: string;
}) => {
  switch (state.scene) {
    case SCENE.opening:
      return <WorkoutOpening state={state} dispatch={dispatch} type={type} />;
    case SCENE.practice:
      return <RecordWorkoutPractice state={state} dispatch={dispatch} />;
    default:
      throw new Error(`incorrect scene ${state.scene}`);
  }
};
