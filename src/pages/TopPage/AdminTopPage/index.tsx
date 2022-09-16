import * as R from 'ramda';
import { Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {
  KanaWorkout,
  KanaWorkoutLog,
  RhythmWorkout,
  RhythmWorkoutLog,
  State,
} from '../../../Model';
import { AppContext } from '../../../App';
import { getRhythmWorkouts } from '../../../services/rhythmWorkout';
import { getKanaWorkouts } from '../../../services/kanaWorkout';
import { ActionTypes } from '../../../Update';
import CustomLabel from '../../../ui/CustomLabel';
import WorkoutLogRow from './WorkoutLogRow';
import WorkoutRow from './WorkoutRow';

const userUid = import.meta.env.VITE_USER_CHEN_UID;

const AdminTopPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;

    const fetchData = async () => {
      let rhythmWorkouts: { [id: string]: RhythmWorkout } = {};
      let kanaWorkouts: { [id: string]: KanaWorkout } = {};

      if (Object.keys(state.admin.rhythmWorkouts).length) {
        rhythmWorkouts = state.admin.rhythmWorkouts;
      } else {
        rhythmWorkouts = await getRhythmWorkouts(userUid);
      }

      if (Object.keys(state.admin.kanaWorkouts).length) {
        kanaWorkouts = state.admin.kanaWorkouts;
      } else {
        kanaWorkouts = await getKanaWorkouts(userUid);
      }

      const updatedState = R.compose(
        R.assocPath<{ [id: string]: RhythmWorkout }, State>(
          ['admin', 'rhythmWorkouts'],
          rhythmWorkouts
        ),
        R.assocPath<{ [id: string]: KanaWorkout }, State>(
          ['admin', 'kanaWorkouts'],
          kanaWorkouts
        )
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
    setInitializing(false);
  }, [initializing]);
  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 16 }}>
        <CustomLabel label='聽力' />
        {Object.values(state.admin.rhythmWorkouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='rhythm' />
          ))}
        <CustomLabel label='認字' />
        {Object.values(state.admin.kanaWorkouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='kana' />
          ))}
      </div>
    </Container>
  );
};

export default AdminTopPage;
