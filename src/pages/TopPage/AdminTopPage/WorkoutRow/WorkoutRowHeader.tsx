import * as R from 'ramda';
import {
  Edit,
  Lock,
  LockOpen,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../App';
import { USERS } from '../../../../assets/user';
import {
  INITIAL_STATE,
  KanaWorkout,
  RhythmWorkout,
  State,
} from '../../../../Model';
import { setRhythmWorkout } from '../../../../services/rhythmWorkout';
import { Action, ActionTypes } from '../../../../Update';
import { setKanaWorkout } from '../../../../services/kanaWorkout';

const WorkoutRowHeader = ({
  open,
  type,
  workout,
  setOpen,
}: {
  workout: RhythmWorkout | KanaWorkout;
  type: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const handleClick = () => {
    navigate(`/workout/${type}/${workout.id}/edit/${type}`);
  };

  const handleLock = () => {
    const updatedWorkout: RhythmWorkout | KanaWorkout = {
      ...workout,
      isLocked: !workout.isLocked,
    };
    updateState(updatedWorkout, type, state, dispatch);
  };

  const handleVisiblity = () => {
    const updatedWorkout: RhythmWorkout | KanaWorkout = {
      ...workout,
      isActive: !workout.isActive,
    };
    updateState(updatedWorkout, type, state, dispatch);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexBasis: 60 }}>{USERS[workout.uid]}</div>
      <div style={{ flexGrow: 1 }}>{workout.title}</div>
      <IconButton size='small' onClick={handleLock}>
        {workout.isLocked ? <Lock /> : <LockOpen />}
      </IconButton>
      <IconButton size='small' onClick={handleVisiblity}>
        {workout.isActive ? <Visibility /> : <VisibilityOff />}
      </IconButton>
      <IconButton size='small' onClick={handleClick}>
        <Edit />
      </IconButton>
      <Button size='small' onClick={() => setOpen(!open)}>
        {open ? 'hide' : 'open'}
      </Button>
    </div>
  );
};

export default WorkoutRowHeader;

const updateState = (
  updatedWorkout: RhythmWorkout | KanaWorkout,
  type: string,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
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
