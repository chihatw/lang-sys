import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as R from 'ramda';
import React, { useContext } from 'react';
import { AppContext } from '../../../../../App';
import { INITIAL_STATE, Workout, State } from '../../../../../Model';
import { setWorkout } from '../../../../../services/rhythmWorkout';
import { ActionTypes } from '../../../../../Update';
import { TYPE } from '../../../../Workout/commons';
import LastLog from './LastLog';

const WorkoutLogSummary = ({
  workout,
  type,
}: {
  workout: Workout;
  type: string;
}) => {
  const { state, dispatch } = useContext(AppContext);
  const handleClearLogs = () => {
    const updatedWorkout: Workout = {
      ...workout,
      logs: {},
    };
    let updatedState = INITIAL_STATE;
    switch (type) {
      case TYPE.rhythm:
        // remote
        setWorkout(type, updatedWorkout);
        // local
        updatedState = R.assocPath<Workout, State>(
          ['admin', 'rhythmWorkouts', updatedWorkout.id],
          updatedWorkout
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
        break;
      case TYPE.kana:
        // remote
        setWorkout(type, updatedWorkout);
        // local
        updatedState = R.assocPath<Workout, State>(
          ['admin', 'kanaWorkouts', updatedWorkout.id],
          updatedWorkout
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
        break;
      default:
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', fontSize: 12 }}>
          <div style={{ flexBasis: 40 }}>count:</div>
          <div>{Object.keys(workout.logs).length}</div>
        </div>

        <LastLog logs={workout.logs} />
      </div>
      <div>
        <IconButton onClick={handleClearLogs}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );
};

export default WorkoutLogSummary;
