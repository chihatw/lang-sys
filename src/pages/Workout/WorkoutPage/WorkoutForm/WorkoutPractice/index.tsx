import * as R from 'ramda';
import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { playPitch, playRhythm } from '../../../../../assets/pitches';
import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { setWorkout } from '../../../../../services/rhythmWorkout';
import { WorkoutState } from '../../Model';
import WorkoutPracticeRow from './WorkoutPracticeRow';
import { Workout, State } from '../../../../../Model';
import {
  getAppWorkouts,
  getCueIds,
  getCues,
  getInput,
  PROP,
  SCENE,
  setSceneToWorkoutState,
  TYPE,
  updateWorkoutLog,
} from '../../../commons';
import { playKana } from '../../../../../assets/kanas';

const WorkoutPractice = ({
  type,
  state,
  dispatch,
}: {
  type: string;
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const theme = useTheme();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const [initialize, setInitialize] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const AnimationElemRef = useRef<HTMLDivElement>(null);

  const cueIds = getCueIds(type, state);
  const currentCueId = cueIds[state.currentIndex];

  const isLast = state.currentIndex + 1 === state.cueIds.length;

  useEffect(() => {
    if (initialize) {
      const AnswerList = AnimationElemRef.current;
      if (!AnswerList) return;
      AnswerList.classList.add('initial');
      setInitialize(false);
      setTimeout(() => {
        AnswerList.classList.remove('initial');
      }, 0);
    }
  }, [initialize]);

  const handleClickPlay = () => {
    if (!state.blob || !state.audioContext) return;
    switch (type) {
      case TYPE.kana:
        playKana(currentCueId, state.blob, state.audioContext);
        break;
      case TYPE.rhythm:
        playRhythm(currentCueId, state.blob, state.audioContext);
        break;
      case TYPE.pitch:
        playPitch(currentCueId, state.blob, state.audioContext);
        break;
      default:
    }

    const updatedState = updatePlayedAt(state);
    dispatch(updatedState);
  };

  const handleClickRow = (cueId: string) => {
    cueId = selectedId === cueId ? '' : cueId;
    setSelectedId(cueId);
  };

  const handleNext = () => {
    let updatedState = setSelectedIdToWorkoutState(selectedId, state);

    // 最終以外
    if (!isLast) {
      updatedState = setCurrentIndexToWorkoutState(
        state.currentIndex + 1,
        updatedState
      );
    }
    // 最終解答
    else {
      updatedState = setSceneToWorkoutState(updatedState, SCENE.result);
    }

    dispatch(updatedState);
    setSelectedId('');
    setInitialize(true);

    const workouts = getAppWorkouts(type, appState);

    // 全問正解の場合、次の問題をアンロック
    const isPerfect = isLast ? checkPerfect(updatedState, cueIds) : false;

    const updatedAppState = updateWorkoutLog(
      type,
      updatedState.log,
      workouts[state.id],
      appState,
      isPerfect
    );

    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
  };
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <div
        style={{
          ...(theme.typography as any).lato100,
          color: '#555',
          fontSize: 40,
          textAlign: 'center',
        }}
      >
        <span>{state.currentIndex + 1}</span>
        <span style={{ fontSize: 32 }}> / </span>
        <span>{cueIds.length}</span>
      </div>
      <div
        ref={AnimationElemRef}
        className={css({
          display: 'flex',
          justifyContent: 'center',
          opacity: 1,
          transition: 'all 0.5s ease-in-out',
          transform: 'translateY(0%)',
          '&.initial': {
            opacity: 0,
            transition: '0s',
            transform: 'translateY(30%)',
          },
        })}
      >
        <IconButton color='primary' onClick={handleClickPlay}>
          <PlayCircleRounded sx={{ fontSize: 120 }} />
        </IconButton>
      </div>
      <div
        style={{
          display: 'grid',
          rowGap: 16,
          maxHeight: 260,
          overflowY: 'scroll',
          paddingTop: 24,
        }}
      >
        {getCues(type, state).map((cue, index) => (
          <WorkoutPracticeRow
            key={index}
            type={type}
            input={getInput(type, cue)}
            isSelected={selectedId === cue.id}
            handleClickRow={() => handleClickRow(cue.id)}
          />
        ))}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}
      >
        <Button
          variant='contained'
          sx={{ color: 'white', width: 240 }}
          disabled={!selectedId}
          onClick={handleNext}
        >
          {isLast ? '選好了' : '下一題'}
        </Button>
      </div>
    </div>
  );
};

export default WorkoutPractice;

const updatePlayedAt = (state: WorkoutState) => {
  let updatedPlayedAt: number[] = [];
  if (state.log.practice.answers[state.currentIndex].playedAt) {
    updatedPlayedAt = [
      ...state.log.practice.answers[state.currentIndex].playedAt,
    ];
  }
  updatedPlayedAt.push(new Date().getTime());

  const updatedState = R.assocPath<number[], WorkoutState>(
    ['log', 'practice', 'answers', state.currentIndex, 'playedAt'],
    updatedPlayedAt
  )(state);

  return updatedState;
};

const setSelectedIdToWorkoutState = (
  selectedId: string,
  state: WorkoutState
) => {
  return R.assocPath<string, WorkoutState>(
    ['log', 'practice', 'answers', state.currentIndex, 'selected'],
    selectedId
  )(state);
};

const setCurrentIndexToWorkoutState = (
  currentIndex: number,
  state: WorkoutState
) => {
  return R.compose(
    R.assocPath<number, WorkoutState>(['currentIndex'], currentIndex),
    R.assocPath<number, WorkoutState>(
      ['log', 'practice', 'answers', currentIndex, 'createdAt'],
      new Date().getTime()
    )
  )(state);
};

const checkPerfect = (state: WorkoutState, correctAnswers: string[]) => {
  let isPerfect = true;
  Object.values(state.log.practice.answers).forEach((answer, index) => {
    if (answer.selected !== correctAnswers[index]) {
      isPerfect = false;
    }
  });
  return isPerfect;
};

const unlockNextWorkout = (
  type: string,
  state: WorkoutState,
  workouts: { [key: string]: Workout },
  appState: State
) => {
  const nextWorkoutId = getNextWorkoutId(state.id, workouts);
  if (!nextWorkoutId) return appState;

  // isLocked を false にする
  const updatedNextWorkout = R.assocPath<boolean, Workout>(
    ['isLocked'],
    false
  )(workouts[nextWorkoutId]);
  setWorkout(type, updatedNextWorkout);

  const updatedAppState = R.assocPath<Workout, State>(
    [PROP[type], updatedNextWorkout.id],
    updatedNextWorkout
  )(appState);
  return updatedAppState;
};

const getNextWorkoutId = (
  currentId: string,
  workouts: { [key: string]: Workout }
) => {
  const workoutListIds = Object.values(workouts)
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((item) => item.id);
  const targetWorkoutIndex = workoutListIds.indexOf(currentId);
  const nextWorkoutId = workoutListIds[targetWorkoutIndex + 1] || '';
  return nextWorkoutId;
};
