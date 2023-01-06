import { Button, Container } from '@mui/material';
import { useContext, useEffect, useReducer } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import { Workout } from '../../../Model';
import CustomLabel from '../../../ui/CustomLabel';
import { getCueIdsFromLog, TYPE } from '../commons';
import { calcCorrectRatio, WorkoutListItem } from './Model';
import WorkoutListRow from './WorkoutListRow';
import { useUserWorkouts } from '../../../services/workout';
import TouchMe from '../../../ui/TouchMe';

const reducer = (state: WorkoutListItem[], action: WorkoutListItem[]) => action;

const WorkoutList = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [listItems, listDispatch] = useReducer(reducer, []);

  const { workouts } = useUserWorkouts(
    state.user?.uid || '',
    state,
    dispatch,
    type
  );

  /** 代入 */
  useEffect(() => {
    if (!type) return;
    if (!Object.keys(workouts).length) return;
    const listItems = buildListItems(workouts, type);
    listDispatch(listItems);
  }, [type, workouts]);

  if (state.authInitializing) return <></>;
  if (!state.user) return <Navigate to='/' />;

  const handleBack = () => {
    navigate('/');
  };

  if (!type) return <></>;

  if (type === TYPE.record && !state.audioContext) return <TouchMe />;

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 80 }}>
        <div style={{ display: 'grid', rowGap: 24 }}>
          <CustomLabel label='練習' />
          {listItems.map((listItem, index) => (
            <WorkoutListRow key={index} listItem={listItem} type={type} />
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

const buildListItems = (workouts: { [id: string]: Workout }, type: string) => {
  const listItems = Object.values(workouts)
    /** リストの並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    /** ログの整形 */
    .map((workout) => {
      return {
        id: workout.id,
        logs: sortWorkoutLog(workout, type),
        type,
        title: workout.title,
      };
    });
  return listItems;
};

const sortWorkoutLog = (workout: Workout, type: string) => {
  const logs: { createdAt: number; correctRatio: number }[] = Object.values(
    workout.logs
  )
    .filter((item) => !!item.result.createdAt)

    /** createdAt で並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((log) => ({
      createdAt: log.createdAt,
      correctRatio: calcCorrectRatio(log, getCueIdsFromLog(type, log)),
    }));
  return logs;
};
