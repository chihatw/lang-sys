import * as R from 'ramda';
import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { KanaWorkout, RhythmWorkout, State } from '../../../Model';
import { AppContext } from '../../../App';
import { getRhythmWorkouts } from '../../../services/rhythmWorkout';
import { getKanaWorkouts } from '../../../services/kanaWorkout';
import { ActionTypes } from '../../../Update';
import CustomLabel from '../../../ui/CustomLabel';
import WorkoutRow from './WorkoutRow';
import { useNavigate } from 'react-router-dom';

const AdminTopPage = () => {
  const navigate = useNavigate();
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
        rhythmWorkouts = await getRhythmWorkouts({ isActiveOnly: false });
      }

      if (Object.keys(state.admin.kanaWorkouts).length) {
        kanaWorkouts = state.admin.kanaWorkouts;
      } else {
        kanaWorkouts = await getKanaWorkouts({ isActiveOnly: false });
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
        <div>
          <Button
            variant='contained'
            sx={{ color: 'white' }}
            onClick={() => navigate('/workout/rhythm/new/rhythm')}
          >
            新規作成
          </Button>
        </div>
        {Object.values(state.admin.rhythmWorkouts)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((workout, index) => (
            <WorkoutRow key={index} workout={workout} type='rhythm' />
          ))}
        <CustomLabel label='認字' />
        <div>
          <Button
            variant='contained'
            sx={{ color: 'white' }}
            onClick={() => navigate('/workout/kana/new/kana')}
          >
            新規作成
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
