import * as R from 'ramda';
import { Button, Container } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RhythmWorkoutState } from '../Model';
import RhythmWorkoutOpening from './RhythmWorkoutOpening';
import RhythmWorkoutPractice from './RhythmWorkoutPractice';
import RhythmWorkoutResult from './RhythmWorkoutResult';
import { AppContext } from '../../../../App';
import { RhythmWorkout, RhythmWorkoutLog, State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import { setRhythmWorkout } from '../../../../services/rhythmWorkout';

const RhythmWorkoutForm = ({
  state,
  dispatch,
}: {
  state: RhythmWorkoutState;
  dispatch: React.Dispatch<RhythmWorkoutState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRemove = () => {
    const updatedLog: RhythmWorkoutLog = {
      ...state.log,
      removedAt: new Date().getTime(),
    };
    const updatedRhythmWorkout = R.assocPath<RhythmWorkoutLog, RhythmWorkout>(
      ['logs', updatedLog.id],
      updatedLog
    )(appState.rhythmWorkouts[state.id]);
    const updatedAppState = R.assocPath<RhythmWorkout, State>(
      ['rhythmWorkouts', updatedRhythmWorkout.id],
      updatedRhythmWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setRhythmWorkout(updatedRhythmWorkout);
    navigate('/workout/list/listening');
  };

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 48 }}>
        {(() => {
          switch (state.pane) {
            case 'opening':
              return <RhythmWorkoutOpening state={state} dispatch={dispatch} />;
            case 'practice':
              return (
                <RhythmWorkoutPractice state={state} dispatch={dispatch} />
              );
            case 'result':
              return <RhythmWorkoutResult state={state} dispatch={dispatch} />;
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

export default RhythmWorkoutForm;
