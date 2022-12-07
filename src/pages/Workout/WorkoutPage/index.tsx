import gojuuon from '../../../assets/audios/gojuuon.mp3';
import downpitch_120 from '../../../assets/audios/downpitch_120.mp3';
import ta_pitches_120 from '../../../assets/audios/ta_pitches_120.mp3';
import pitch_input_100 from '../../../assets/audios/pitch_input_100.mp3';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import TouchMe from '../../../ui/TouchMe';
import {
  WorkoutState,
  buildWorkoutState,
  INITIAL_WORKOUT_STATE,
} from './Model';
import WorkoutForm from './WorkoutForm';
import { getAppWorkouts, TYPE } from '../commons';

const PATH = {
  [TYPE.kana]: gojuuon,
  [TYPE.pitch]: ta_pitches_120,
  [TYPE.rhythm]: downpitch_120,
  [TYPE.pitchInput]: pitch_input_100,
};

const reducer = (state: WorkoutState, action: WorkoutState) => action;

const WorkoutPage = ({ type }: { type: string }) => {
  const { workoutId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [formState, formDispatch] = useReducer(reducer, INITIAL_WORKOUT_STATE);

  const workouts = getAppWorkouts(type, state);

  useEffect(() => {
    if (!workoutId || !initializing || !state.audioContext) return;

    const fetchData = async () => {
      const initialState = await buildWorkoutState(
        type,
        state,
        workouts[workoutId],
        dispatch,
        PATH[type]
      );
      formDispatch(initialState);
      setInitializing(false);
    };
    fetchData();
  }, [workoutId, initializing, state.blobs, state.audioContext, type]);

  if (!state.user) return <Navigate to='/signIn' />;

  if (!workoutId || !workouts[workoutId]) return <Navigate to='/' />;

  if (!state.audioContext) return <TouchMe />;

  return <WorkoutForm state={formState} dispatch={formDispatch} type={type} />;
};

export default WorkoutPage;
