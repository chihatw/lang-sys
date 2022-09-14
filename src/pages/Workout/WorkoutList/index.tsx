import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import CustomLabel from '../../../ui/CustomLabel';
import { buildWorkoutListItems, WorkoutListItem } from './Model';
import WorkoutListRow from './WorkoutListRow';

const reducer = (state: WorkoutListItem[], action: WorkoutListItem[]) => action;

const WorkoutList = () => {
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2 }}>
      <div style={{ display: 'grid', rowGap: 180 }}>
        <div style={{ display: 'grid', rowGap: 24 }}>
          <CustomLabel label='練習' />
          {listItems.map((listItem, index) => (
            <WorkoutListRow key={index} listItem={listItem} />
          ))}
        </div>
        <Button
          sx={{ color: 'white' }}
          variant='contained'
          onClick={handleBack}
        >
          回到主頁
        </Button>
      </div>
    </Container>
  );
};

export default WorkoutList;
