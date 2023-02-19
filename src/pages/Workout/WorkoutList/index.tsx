import * as R from 'ramda';
import { Button, Container } from '@mui/material';
import { useContext, useEffect, useReducer } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import { State, Workout } from '../../../Model';
import CustomLabel from '../../../ui/CustomLabel';
import { getCueIdsFromLog, TYPE } from '../commons';
import { calcCorrectRatio, WorkoutListItem } from './Model';
import WorkoutListRow from './WorkoutListRow';
import { useUserWorkouts } from '../../../services/workout';
import TouchMe from '../../../ui/TouchMe';
import { blobToAudioBuffer } from '../../../services/utils';
import { ActionTypes } from '../../../Update';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../repositories/firebase';

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
    const listItems = buildListItems(workouts, state.audioBuffers, type);
    listDispatch(listItems);
  }, [type, workouts, state.audioBuffers]);

  /** state.audioBuffers の更新 */
  useEffect(() => {
    if (!state.audioContext) return;
    // 録音ファイルが存在しない場合、エラーを表示する
    const paths = Object.values(workouts).map(
      (workout) => `/recordWorkout/${workout.id}`
    );

    const localAudioBuffers: { [path: string]: AudioBuffer } = {};
    for (const [path, audioBuffer] of Object.entries(state.audioBuffers)) {
      if (paths.includes(path)) {
        localAudioBuffers[path] = audioBuffer;
      }
    }
    // local にある場合は、終了
    if (Object.keys(localAudioBuffers).length === paths.length) return;

    const fetchData = async () => {
      let remoteAudioBuffers: { [path: string]: AudioBuffer } = {};
      await Promise.all(
        paths.map(async (path) => {
          const audioBuffer =
            state.audioContext &&
            (await getAudioBuffer(path, state.audioContext, localAudioBuffers));
          if (!!audioBuffer) {
            remoteAudioBuffers = {
              ...remoteAudioBuffers,
              [path]: audioBuffer,
            };
          }
        })
      );

      if (!Object.keys(remoteAudioBuffers).length) return;
      const updatedAudioBuffers = {
        ...state.audioBuffers,
        ...remoteAudioBuffers,
      };
      const updatedState = R.assocPath<{ [path: string]: AudioBuffer }, State>(
        ['audioBuffers'],
        updatedAudioBuffers
      )(state);
      console.log(`%cdispatch state audioBuffers`, 'color:red');
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [workouts, state.audioContext]);

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

const buildListItems = (
  workouts: { [id: string]: Workout },
  audioBuffers: { [id: string]: AudioBuffer },
  type: string
) => {
  const listItems = Object.values(workouts)
    /** リストの並べ替え */
    .sort((a, b) => a.createdAt - b.createdAt)
    /** ログの整形 */
    .map((workout) => {
      const path = `/recordWorkout/${workout.id}`;
      return {
        id: workout.id,
        logs: sortWorkoutLog(workout, type),
        type,
        title: workout.title,
        audioBuffer: audioBuffers[path] || null,
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

const getAudioBuffer = async (
  path: string,
  audioContext: AudioContext,
  localAudioBuffers: { [path: string]: AudioBuffer }
) => {
  // local にある場合は、何もしない
  if (Object.keys(localAudioBuffers).includes(path)) return;

  let fetchPath = '';
  try {
    // try catch に包まないと、エラーで処理が中断する
    fetchPath = await getDownloadURL(ref(storage, path));
  } catch (e) {
    console.warn(e);
  }
  if (!fetchPath) return;

  const response = await fetch(fetchPath);
  if (!response) return;

  const blob = await response.blob();
  if (!blob) return;

  const audioBuffer = await blobToAudioBuffer(blob, audioContext);
  return audioBuffer;
};
