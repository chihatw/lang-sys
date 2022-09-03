import * as R from 'ramda';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext } from 'react';

import { KanaWorkoutState } from '../../Model';
import { AppContext } from '../../../../../App';
import { createSourceNode, shuffle } from '../../../../../services/utils';
import {
  INITIAL_KANA_WORKOUT_LOG,
  KanaWorkout,
  KanaWorkoutLog,
  State,
} from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { setKanaWorkout } from '../../../../../services/kanaWorkout';
import KanaWorkoutResultCorrectRatio from './KanaWorkoutResultCorrectRatio';
import KanaWorkoutResultTable from './KanaWorkoutResultTable';

const KanaWorkoutResult = ({
  state,
  dispatch,
}: {
  state: KanaWorkoutState;
  dispatch: React.Dispatch<KanaWorkoutState>;
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
    const updatedState = R.assocPath<string[], KanaWorkoutState>(
      ['log', 'result', 'tapped'],
      updatedTapped
    )(state);
    dispatch(updatedState);

    const updatedKanaWorkout = R.assocPath<KanaWorkoutLog, KanaWorkout>(
      ['logs', updatedState.log.id],
      updatedState.log
    )(appState.kanaWorkouts[state.id]);

    const updatedAppState = R.assocPath<KanaWorkout, State>(
      ['rhythmWorkouts', updatedKanaWorkout.id],
      updatedKanaWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setKanaWorkout(updatedKanaWorkout);
  };

  const handleRetry = () => {
    const updatedLog: KanaWorkoutLog = {
      ...state.log,
      removedAt: new Date().getTime(),
    };

    const updatedKanaWorkout = R.assocPath<KanaWorkoutLog, KanaWorkout>(
      ['logs', updatedLog.id],
      updatedLog
    )(appState.kanaWorkouts[state.id]);

    const updatedAppState = R.assocPath<KanaWorkout, State>(
      ['rhythmWorkouts', updatedKanaWorkout.id],
      updatedKanaWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setKanaWorkout(updatedKanaWorkout);

    const kanas = shuffle(state.kanas);
    const updatedState: KanaWorkoutState = {
      ...state,
      pane: 'opening',
      kanas,
      currentIndex: 0,
      log: {
        ...INITIAL_KANA_WORKOUT_LOG,
        id: nanoid(8),
        createdAt: new Date().getTime(),
        kanas,
      },
    };
    dispatch(updatedState);
  };
  if (!Object.values(state.log.practice.answers).length) return <></>;

  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <KanaWorkoutResultCorrectRatio state={state} />
      <KanaWorkoutResultTable state={state} handleClick={handleClick} />
      <div style={{ height: 16 }} />
      <Button variant='contained' sx={{ color: 'white' }} onClick={handleRetry}>
        再一次練習
      </Button>
    </div>
  );
};

export default KanaWorkoutResult;
