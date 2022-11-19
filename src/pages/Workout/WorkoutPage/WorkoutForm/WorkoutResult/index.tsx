import * as R from 'ramda';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext } from 'react';

import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { WorkoutState } from '../../Model';
import WorkoutResultTable from './WorkoutResultTable';
import { shuffle } from '../../../../../services/utils';
import WorkoutResultCorrectRatio from './WorkoutResultCorrectRatio';
import { INITIAL_WORKOUT_LOG } from '../../../../../Model';
import {
  getAppWorkouts,
  getCueIds,
  SCENE,
  TYPE,
  updateWorkoutLog,
} from '../../../commons';
import { playKana } from '../../../../../assets/kanas';
import { playPitch, playRhythm } from '../../../../../assets/pitches';

const WorkoutResult = ({
  type,
  state,
  dispatch,
}: {
  type: string;
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const handleClick = async (cueId: string) => {
    if (!state.blob || !state.audioContext) return;
    switch (type) {
      case TYPE.kana:
        playKana(cueId, state.blob, state.audioContext);
        break;
      case TYPE.rhythm:
        playRhythm(cueId, state.blob, state.audioContext);
        break;
      case TYPE.pitch:
        playPitch(cueId, state.blob, state.audioContext);
        break;
      default:
    }

    const updatedState = updateTapped(state, cueId);
    dispatch(updatedState);

    const workouts = getAppWorkouts(type, appState);
    const updatedAppState = updateWorkoutLog(
      type,
      updatedState.log,
      workouts[state.id],
      appState
    );

    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
  };

  const handleRetry = () => {
    const cueIds = getCueIds(type, state);
    const shuffledCueIds = shuffle(cueIds);

    const updatedState: WorkoutState = {
      ...state,
      scene: SCENE.opening,
      cueIds: shuffledCueIds,
      currentIndex: 0,
      log: {
        ...INITIAL_WORKOUT_LOG,
        id: nanoid(8),
        createdAt: new Date().getTime(),
        cueIds: shuffledCueIds,
      },
    };
    dispatch(updatedState);
  };

  if (!Object.values(state.log.practice.answers).length) return <></>;
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <WorkoutResultCorrectRatio type={type} log={state.log} />
      <WorkoutResultTable type={type} state={state} handleClick={handleClick} />
      <div style={{ height: 16 }} />
      <Button variant='contained' sx={{ color: 'white' }} onClick={handleRetry}>
        再一次練習
      </Button>
    </div>
  );
};

export default WorkoutResult;

const updateTapped = (state: WorkoutState, cueId: string) => {
  let updatedTapped: string[] = [];
  if (state.log.result.tapped) {
    updatedTapped = [...state.log.result.tapped];
  }
  updatedTapped.push(cueId);

  const updatedState = R.assocPath<string[], WorkoutState>(
    ['log', 'result', 'tapped'],
    updatedTapped
  )(state);

  return updatedState;
};
