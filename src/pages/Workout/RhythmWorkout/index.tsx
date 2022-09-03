import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import TouchMe from '../../../ui/TouchMe';
import {
  buildRhythmWorkoutState,
  INITIAL_RHYTHM_WORKOUT_STATE,
  RhythmWorkoutState,
} from './Model';
import RhythmWorkoutForm from './RhythmWorkoutForm';

const reducer = (state: RhythmWorkoutState, action: RhythmWorkoutState) =>
  action;

const RhythmWorkout = () => {
  const { workoutId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [formState, formDispatch] = useReducer(
    reducer,
    INITIAL_RHYTHM_WORKOUT_STATE
  );

  useEffect(() => {
    if (!workoutId || !initializing || !state.audioContext) return;
    const workout = state.rhythmWorkouts[workoutId];
    const fetchData = async () => {
      const initialState = await buildRhythmWorkoutState(
        state,
        workout,
        dispatch
      );
      formDispatch(initialState);
      setInitializing(false);
    };
    fetchData();
  }, [workoutId, initializing, state.blobs, state.audioContext]);
  if (!state.user) return <Navigate to='/signIn' />;
  if (!workoutId || !state.rhythmWorkouts[workoutId])
    return <Navigate to='/' />;
  if (!state.audioContext) return <TouchMe />;

  return <RhythmWorkoutForm state={formState} dispatch={formDispatch} />;
};

export default RhythmWorkout;
