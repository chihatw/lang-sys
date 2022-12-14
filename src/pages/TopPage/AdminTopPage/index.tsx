import * as R from 'ramda';
import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Workout, State } from '../../../Model';
import { AppContext } from '../../../App';
import { getWorkouts } from '../../../services/workout';
import { ActionTypes } from '../../../Update';
import CustomLabel from '../../../ui/CustomLabel';
import WorkoutRow from './WorkoutRow';
import { useNavigate } from 'react-router-dom';
import { TYPE } from '../../Workout/commons';

const AdminTopPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;

    const fetchData = async () => {
      let kanaWorkouts: { [id: string]: Workout } = {};
      let pitchWorkouts: { [id: string]: Workout } = {};
      let rhythmWorkouts: { [id: string]: Workout } = {};
      let pitchInputWorkous: { [id: string]: Workout } = {};

      if (Object.keys(state.admin.rhythmWorkouts).length) {
        rhythmWorkouts = state.admin.rhythmWorkouts;
      } else {
        rhythmWorkouts = await getWorkouts({
          type: TYPE.rhythm,
          isActiveOnly: false,
        });
      }

      if (Object.keys(state.admin.pitchInputWorkouts).length) {
        pitchInputWorkous = state.admin.pitchInputWorkouts;
      } else {
        pitchInputWorkous = await getWorkouts({
          type: TYPE.pitchInput,
          isActiveOnly: false,
        });
      }

      if (Object.keys(state.admin.pitchWorkouts).length) {
        pitchWorkouts = state.admin.pitchWorkouts;
      } else {
        pitchWorkouts = await getWorkouts({
          type: TYPE.pitch,
          isActiveOnly: false,
        });
      }

      if (Object.keys(state.admin.kanaWorkouts).length) {
        kanaWorkouts = state.admin.kanaWorkouts;
      } else {
        kanaWorkouts = await getWorkouts({
          type: TYPE.kana,
          isActiveOnly: false,
        });
      }

      const updatedState = R.compose(
        R.assocPath<{ [id: string]: Workout }, State>(
          ['admin', 'rhythmWorkouts'],
          rhythmWorkouts
        ),
        R.assocPath<{ [id: string]: Workout }, State>(
          ['admin', 'pitchWorkouts'],
          pitchWorkouts
        ),
        R.assocPath<{ [id: string]: Workout }, State>(
          ['admin', 'kanaWorkouts'],
          kanaWorkouts
        ),
        R.assocPath<{ [id: string]: Workout }, State>(
          ['admin', 'pitchInputWorkouts'],
          pitchInputWorkous
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
        <CustomLabel label='???????????????+?????????' />
        {Object.values(state.admin.pitchInputWorkouts)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='rhythm' />
          ))}

        <CustomLabel label='??????????????????' />
        <div>
          <Button
            variant='contained'
            sx={{ color: 'white' }}
            onClick={() => navigate('/rhythm/new/')}
          >
            ????????????
          </Button>
        </div>
        {Object.values(state.admin.rhythmWorkouts)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='rhythm' />
          ))}
        <CustomLabel label='??????????????????' />
        {Object.values(state.admin.pitchWorkouts)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='rhythm' />
          ))}
        <CustomLabel label='??????' />
        <div>
          <Button
            variant='contained'
            sx={{ color: 'white' }}
            onClick={() => navigate('/kana/new/')}
          >
            ????????????
          </Button>
        </div>
        {Object.values(state.admin.kanaWorkouts)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='kana' />
          ))}
      </div>
    </Container>
  );
};

export default AdminTopPage;
