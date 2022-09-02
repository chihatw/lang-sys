import { Card, CardContent, Container, useTheme } from '@mui/material';
import * as R from 'ramda';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App';
import { RhythmWorkout, State } from '../../../Model';
import { getRhythmWorkouts } from '../../../services/rhythmWorkout';
import CustomLabel from '../../../ui/CustomLabel';
import { ActionTypes } from '../../../Update';

const WorkoutList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setIsInitializing] = useState(true);
  useEffect(() => {
    if (!state.user || !initializing) return;
    const fetchData = async () => {
      const rhythmWorkouts = Object.keys(state.rhythmWorkouts).length
        ? state.rhythmWorkouts
        : await getRhythmWorkouts(state.user!.uid);
      const updatedState = R.assocPath<{ [id: string]: RhythmWorkout }, State>(
        ['rhythmWorkouts'],
        rhythmWorkouts
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
      setIsInitializing(false);
    };
    fetchData();
  }, [initializing, state.user]);

  if (state.authInitializing) return <></>;
  if (!state.user) return <Navigate to='/' />;

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2 }}>
      <div style={{ display: 'grid', rowGap: 24 }}>
        <CustomLabel label='練習' />
        {Object.values(state.rhythmWorkouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout, index) => (
            <WorkoutRow
              key={index}
              id={workout.id}
              type='rhythm'
              title={workout.title}
            />
          ))}
      </div>
    </Container>
  );
};

export default WorkoutList;

const WorkoutRow = ({
  id,
  type,
  title,
}: {
  id: string;
  type: string;
  title: string;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/workout/${type}/${id}`);
  };
  return (
    <Card
      sx={{
        cursor: 'pointer',
        WebkitTapHighlightColor: '#EAF4F5',
        '&:active,&:focus': { background: '#EAF4F5' },
      }}
      onClick={handleClick}
      elevation={1}
    >
      <CardContent>
        <div
          style={{
            ...(theme.typography as any).mPlusRounded300,
            rowGap: 8,
            display: 'grid',
            minHeight: 40,
            userSelect: 'none',
            marginBottom: -8,
          }}
        >
          <div
            style={{ fontSize: 20, lineHeight: '40px', textAlign: 'center' }}
          >
            {title}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
