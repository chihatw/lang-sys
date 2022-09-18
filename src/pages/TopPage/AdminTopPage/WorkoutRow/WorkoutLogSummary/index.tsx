import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as R from 'ramda';
import React, { useContext } from 'react';
import { AppContext } from '../../../../../App';
import {
  INITIAL_STATE,
  KanaWorkout,
  RhythmWorkout,
  State,
} from '../../../../../Model';
import { setKanaWorkout } from '../../../../../services/kanaWorkout';
import { setRhythmWorkout } from '../../../../../services/rhythmWorkout';
import { ActionTypes } from '../../../../../Update';
import LastLog from './LastLog';

const WorkoutLogSummary = ({
  workout,
  type,
}: {
  workout: RhythmWorkout | KanaWorkout;
  type: string;
}) => {
  const { state, dispatch } = useContext(AppContext);
  const handleClearLogs = () => {
    const updatedWorkout: RhythmWorkout | KanaWorkout = {
      ...workout,
      logs: {},
    };
    let updatedState = INITIAL_STATE;
    switch (type) {
      case 'rhythm':
        // remote
        setRhythmWorkout(updatedWorkout as RhythmWorkout);
        // local
        updatedState = R.assocPath<RhythmWorkout, State>(
          ['admin', 'rhythmWorkouts', updatedWorkout.id],
          updatedWorkout as RhythmWorkout
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
        break;
      case 'kana':
        // remote
        setKanaWorkout(updatedWorkout as KanaWorkout);
        // local
        updatedState = R.assocPath<KanaWorkout, State>(
          ['admin', 'kanaWorkouts', updatedWorkout.id],
          updatedWorkout as KanaWorkout
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
