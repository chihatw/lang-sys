import * as R from 'ramda';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { createSourceNode, shuffle } from '../../../../../services/utils';
import { RhythmWorkoutState } from '../../Model';
import RhythmWorkoutResultCorrectRatio from './RhythmWorkoutResultCorrectRatio';
import {
  State,
  RhythmWorkout,
  RhythmWorkoutLog,
  INITIAL_RHYTHM_WORKOUT_LOG,
} from '../../../../../Model';
import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { setRhythmWorkout } from '../../../../../services/rhythmWorkout';
import RhythmWorkoutResultTable from './RhythmWorkoutResultTable';

const RhythmWorkoutResult = ({
  state,
  dispatch,
}: {
  state: RhythmWorkoutState;
  dispatch: React.Dispatch<RhythmWorkoutState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const handleClick = async (start: number, end: number, type: string) => {
    if (!state.blob || !state.audioContext) return;
    const sourceNode = await createSourceNode(state.blob, state.audioContext);
    sourceNode.start(0, start, end - start);

    let updatedTapped: string[] = [];
    if (state.log.result.tapped) {
      updatedTapped = [...state.log.result.tapped];
    }
    updatedTapped.push(type);
    const updatedState = R.assocPath<string[], RhythmWorkoutState>(
      ['log', 'result', 'tapped'],
      updatedTapped
    )(state);
    dispatch(updatedState);
    const updatedRhythmWorkout = R.assocPath<RhythmWorkoutLog, RhythmWorkout>(
      ['logs', updatedState.log.id],
      updatedState.log
    )(appState.rhythmWorkouts[state.id]);
    const updatedAppState = R.assocPath<RhythmWorkout, State>(
      ['rhythmWorkouts', updatedRhythmWorkout.id],
      updatedRhythmWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setRhythmWorkout(updatedRhythmWorkout);
  };

  const handleRetry = () => {
    const updatedLog: RhythmWorkoutLog = {
      ...state.log,
      removedAt: new Date().getTime(),
    };
    const updatedRhythmWorkout = R.assocPath<RhythmWorkoutLog, RhythmWorkout>(
      ['logs', updatedLog.id],
      updatedLog
    )(appState.rhythmWorkouts[state.id]);
    const updatedAppState = R.assocPath<RhythmWorkout, State>(
      ['rhythmWorkouts', updatedRhythmWorkout.id],
      updatedRhythmWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setRhythmWorkout(updatedRhythmWorkout);

    const cueIds = shuffle(state.cueIds);

    const updatedState: RhythmWorkoutState = {
      ...state,
      pane: 'opening',
      cueIds,
      currentIndex: 0,
      log: {
        ...INITIAL_RHYTHM_WORKOUT_LOG,
        id: nanoid(8),
        createdAt: new Date().getTime(),
        cueIds,
      },
    };
    dispatch(updatedState);
  };

  if (!Object.values(state.log.practice.answers).length) return <></>;
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <RhythmWorkoutResultCorrectRatio state={state} />
      <RhythmWorkoutResultTable state={state} handleClick={handleClick} />
      <div style={{ height: 16 }} />
      <Button variant='contained' sx={{ color: 'white' }} onClick={handleRetry}>
        再一次練習
      </Button>
    </div>
  );
};

export default RhythmWorkoutResult;
