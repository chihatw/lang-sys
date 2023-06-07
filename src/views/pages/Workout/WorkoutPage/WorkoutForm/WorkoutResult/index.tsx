import * as R from 'ramda';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext } from 'react';

import { WorkoutState } from '../../Model';
import WorkoutResultTable from './WorkoutResultTable';
import { playAudioBuffer, shuffle } from '../../../../../../services/utils';
import WorkoutResultCorrectRatio from './WorkoutResultCorrectRatio';
import { INITIAL_WORKOUT_LOG } from '../../../../../../Model';
import { SCENE, updateWorkoutLog } from '../../../commons';
import { AppContext } from '../../../../..';

const WorkoutResult = ({
  state,
  dispatch,
  type,
}: {
  type: string;
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const handleClick = async (cueId: string) => {
    if (!state.audioBuffer || !appState.audioContext) return;
    playAudioBuffer(type, cueId, state.audioBuffer, appState.audioContext);

    const updatedState = updateTapped(state, cueId);

    // local
    dispatch(updatedState);

    // app, remote
    updateWorkoutLog(
      type,
      updatedState.log,
      updatedState.workout,
      appState,
      appDispatch
    );
  };

  const handleRetry = () => {
    const cueIds = state.cues.map((cue) => cue.id);
    const shuffledCueIds = shuffle(cueIds);
    const shuffledCues = shuffledCueIds.map(
      (id) => state.cues.find((cue) => cue.id === id)!
    );

    const updatedState: WorkoutState = {
      ...state,
      cues: shuffledCues,
      scene: SCENE.opening,
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
