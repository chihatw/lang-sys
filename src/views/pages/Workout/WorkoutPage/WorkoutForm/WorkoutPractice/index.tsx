import * as R from 'ramda';
import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { WorkoutState } from '../../Model';
import {
  SCENE,
  setSceneToWorkoutState,
  TYPE,
  updateWorkoutLog,
} from '../../../commons';
import SelectPractice from './SelectPractice';
import InputPractice from './InputPractice';
import { playAudioBuffer } from '../../../../../../services/utils';
import { AppContext } from '../../../../..';

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

  const [input, setInput] = useState('');
  const [animationInitialize, setAnimationInitialize] = useState(true);
  const AnimationElemRef = useRef<HTMLDivElement>(null);

  const cueIds = state.cues.map((cue) => cue.id);
  const currentCueId = cueIds[state.currentIndex];

  const isLast = state.currentIndex + 1 === state.cues.length;

  useEffect(() => {
    if (animationInitialize) {
      const AnimationElem = AnimationElemRef.current;
      if (!AnimationElem) return;
      AnimationElem.classList.add('initial');
      setAnimationInitialize(false);
      setTimeout(() => {
        AnimationElem.classList.remove('initial');
      }, 0);
    }
  }, [animationInitialize]);

  const handleClickPlay = () => {
    if (!state.audioBuffer || !appState.audioContext) return;
    playAudioBuffer(
      type,
      currentCueId,
      state.audioBuffer,
      appState.audioContext
    );

    const updatedState = updatePlayedAt(state);
    dispatch(updatedState);
  };

  const handleNext = () => {
    let updatedState = setInputToWorkoutState(input, state);

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

    // local
    dispatch(updatedState);
    setInput('');
    setAnimationInitialize(true);

    // app, remote
    updateWorkoutLog(
      type,
      updatedState.log,
      updatedState.workout,
      appState,
      appDispatch
    );
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
        <span>{state.cues.length}</span>
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
      <WorkoutPracticeSwitcher
        type={type}
        state={state}
        input={input}
        setInput={setInput}
      />
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}
      >
        <Button
          variant='contained'
          sx={{ color: 'white', width: 240 }}
          disabled={
            input.replace('＼', '').length !==
            currentCueId.replace('＼', '').length
          }
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

const setInputToWorkoutState = (input: string, state: WorkoutState) => {
  return R.assocPath<string, WorkoutState>(
    ['log', 'practice', 'answers', state.currentIndex, 'selected'],
    input
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

const WorkoutPracticeSwitcher = ({
  type,
  state,
  input,
  setInput,
}: {
  type: string;
  state: WorkoutState;
  input: string;
  setInput: (cueId: string) => void;
}) => {
  switch (type) {
    case TYPE.pitchInput:
      return <InputPractice state={state} input={input} setInput={setInput} />;
    case TYPE.kana:
    case TYPE.pitch:
    case TYPE.rhythm:
      return (
        <SelectPractice
          type={type}
          state={state}
          input={input}
          setInput={setInput}
        />
      );
    default:
      console.error(`incorrect type: ${type}`);
      return <></>;
  }
};
