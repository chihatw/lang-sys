import { Button, Container } from '@mui/material';
import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCENE, TYPE } from '../../commons';

import { WorkoutState } from '../Model';
import RecordWorkoutPractice from './RecordWorkoutPractice';
import WorkoutOpening from './WorkoutOpening';
import WorkoutPractice from './WorkoutPractice';
import WorkoutResult from './WorkoutResult';

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
      return (
        <WorkoutPracticeSwitch state={state} dispatch={dispatch} type={type} />
      );
    case SCENE.result:
      return <WorkoutResult state={state} dispatch={dispatch} type={type} />;
    default:
      throw new Error(`incorrect scene ${state.scene}`);
  }
};

const WorkoutPracticeSwitch = ({
  state,
  dispatch,
  type,
}: {
  state: WorkoutState;
  dispatch: Dispatch<WorkoutState>;
  type: string;
}) => {
  switch (type) {
    case TYPE.kana:
    case TYPE.pitch:
    case TYPE.rhythm:
    case TYPE.pitchInput:
      return <WorkoutPractice state={state} dispatch={dispatch} type={type} />;
    case TYPE.record:
      return <RecordWorkoutPractice state={state} dispatch={dispatch} />;
    default:
      console.error(`incorrect type: ${type}`);
      return <></>;
  }
};
