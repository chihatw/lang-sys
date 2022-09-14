import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { KanaWorkoutState } from '../Model';
import KanaWorkoutOpening from './KanaWorkoutOpening';
import KanaWorkoutPractice from './KanaWorkoutPractice';
import KanaWorkoutResult from './KanaWorkoutResult';

const KanaWorkoutForm = ({
  state,
  dispatch,
}: {
  state: KanaWorkoutState;
  dispatch: React.Dispatch<KanaWorkoutState>;
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/workout/list/kana');
  };

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        {(() => {
          switch (state.pane) {
            case 'opening':
              return <KanaWorkoutOpening state={state} dispatch={dispatch} />;
            case 'practice':
              return <KanaWorkoutPractice state={state} dispatch={dispatch} />;
            case 'result':
              return <KanaWorkoutResult state={state} dispatch={dispatch} />;
            default:
              return <></>;
          }
        })()}
        <Button variant='outlined' onClick={handleBack}>
          練習結束
        </Button>
      </div>
    </Container>
  );
};

export default KanaWorkoutForm;
