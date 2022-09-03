import * as R from 'ramda';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { AppContext } from '../../../../App';
import { ActionTypes } from '../../../../Update';
import { setKanaWorkout } from '../../../../services/kanaWorkout';
import { KanaWorkoutState } from '../Model';
import { KanaWorkout, KanaWorkoutLog, State } from '../../../../Model';
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
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRemove = () => {
    const updatedLog: KanaWorkoutLog = {
      ...state.log,
      removedAt: new Date().getTime(),
    };
    const updatedKanaWorkout = R.assocPath<KanaWorkoutLog, KanaWorkout>(
      ['logs', updatedLog.id],
      updatedLog
    )(appState.kanaWorkouts[state.id]);
    const updatedAppState = R.assocPath<KanaWorkout, State>(
      ['kanaWorkouts', updatedKanaWorkout.id],
      updatedKanaWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setKanaWorkout(updatedKanaWorkout);
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
        <Button variant='outlined' onClick={handleRemove}>
          練習結束
        </Button>
      </div>
    </Container>
  );
};

export default KanaWorkoutForm;
