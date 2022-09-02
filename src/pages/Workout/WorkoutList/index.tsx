import { Container } from '@mui/material';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import CustomLabel from '../../../ui/CustomLabel';
import { buildWorkoutListItems, WorkoutListItem } from './Model';
import WorkoutRow from './WorkoutRow';

const reducer = (state: WorkoutListItem[], action: WorkoutListItem[]) => action;

const WorkoutList = () => {
  const { type } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [listItems, listDispatch] = useReducer(reducer, []);
  const [initializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!state.user || !initializing || !type) return;
    const fetchData = async () => {
      const listItems = await buildWorkoutListItems(state, type, dispatch);
      listDispatch(listItems);
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
        {listItems.map((listItem, index) => (
          <WorkoutRow key={index} listItem={listItem} />
        ))}
      </div>
    </Container>
  );
};

export default WorkoutList;
