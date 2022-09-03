import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import TouchMe from '../../../ui/TouchMe';
import KanaWorkoutForm from './KanaWorkoutForm';
import {
  buildKanaWorkoutState,
  INITIAL_KANA_WORKOUT_STATE,
  KanaWorkoutState,
} from './Model';

const reducer = (state: KanaWorkoutState, action: KanaWorkoutState) => action;

const KanaWorkout = () => {
  const { workoutId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [formState, formDispatch] = useReducer(
    reducer,
    INITIAL_KANA_WORKOUT_STATE
  );

  useEffect(() => {
    if (!workoutId || !initializing || !state.audioContext) return;
    const workout = state.kanaWorkouts[workoutId];
    const fetchData = async () => {
      const initialState = await buildKanaWorkoutState(
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
  if (!workoutId || !state.kanaWorkouts[workoutId]) return <Navigate to='/' />;
  if (!state.audioContext) return <TouchMe />;

  return <KanaWorkoutForm state={formState} dispatch={formDispatch} />;
};

export default KanaWorkout;
