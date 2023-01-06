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
import { INITIAL_STATE, Workout, State } from '../../../../Model';
import { Action, ActionTypes } from '../../../../Update';
import { setWorkout } from '../../../../services/workout';
import { TYPE } from '../../../Workout/commons';

const WorkoutRowHeader = ({
  open,
  type,
  workout,
  setOpen,
}: {
  workout: Workout;
  type: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const handleClick = () => {
    navigate(`/${type}/${workout.id}/edit/`);
  };

  const handleVisiblity = () => {
    const updatedWorkout: Workout = {
      ...workout,
      isActive: !workout.isActive,
    };
    updateState(updatedWorkout, type, state, dispatch);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexBasis: 60 }}>{USERS[workout.uid]}</div>
      <div style={{ flexGrow: 1 }}>{workout.title}</div>
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
  updatedWorkout: Workout,
  type: string,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
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
