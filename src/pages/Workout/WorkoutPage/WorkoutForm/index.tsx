import { Button, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCENE } from '../../commons';

import { WorkoutState } from '../Model';
import WorkoutOpening from './WorkoutOpening';
import WorkoutPractice from './WorkoutPractice';
import WorkoutResult from './WorkoutResult';

const WorkoutForm = ({
  type,
  state,
  dispatch,
}: {
  type: string;
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/list/${type}`);
  };

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        {(() => {
          switch (state.scene) {
            case SCENE.opening:
              return (
                <WorkoutOpening type={type} state={state} dispatch={dispatch} />
              );
            case SCENE.practice:
              return (
                <WorkoutPractice
                  type={type}
                  state={state}
                  dispatch={dispatch}
                />
              );
            case SCENE.result:
              return (
                <WorkoutResult type={type} state={state} dispatch={dispatch} />
              );
            default:
              throw new Error(`incorrect scene ${state.scene}`);
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
