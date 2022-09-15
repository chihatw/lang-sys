import * as R from 'ramda';
import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { PITCHES } from '../../../../../assets/pitches';
import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { setRhythmWorkout } from '../../../../../services/rhythmWorkout';
import { createSourceNode } from '../../../../../services/utils';
import { RhythmWorkoutState } from '../../Model';
import RhythmWorkoutPracticeRow from './RhythmWorkoutPracticeRow';
import { RhythmWorkout, RhythmWorkoutLog, State } from '../../../../../Model';

const RhythmWorkoutPractice = ({
  state,
  dispatch,
}: {
  state: RhythmWorkoutState;
  dispatch: React.Dispatch<RhythmWorkoutState>;
}) => {
  const theme = useTheme();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const [initialize, setInitialize] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const AnimationElemRef = useRef<HTMLDivElement>(null);

  const currentCueId = state.cueIds[state.currentIndex];
  const currentCue = PITCHES[currentCueId];

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

  const play = async () => {
    if (!state.blob || !state.audioContext) return;
    const sourceNode = await createSourceNode(state.blob, state.audioContext);
    sourceNode.start(0, currentCue.start, currentCue.end - currentCue.start);
  };
  const handleClickPlay = () => {
    play();

    let updatedPlayedAt: number[] = [];
    if (state.log.practice.answers[state.currentIndex].playedAt) {
      updatedPlayedAt = [
        ...state.log.practice.answers[state.currentIndex].playedAt,
      ];
    }

    updatedPlayedAt.push(new Date().getTime());
    const updatedState = R.assocPath<number[], RhythmWorkoutState>(
      ['log', 'practice', 'answers', state.currentIndex, 'playedAt'],
      updatedPlayedAt
    )(state);
    dispatch(updatedState);
  };

  const handleClickRow = (cueId: string) => {
    cueId = selectedId === cueId ? '' : cueId;
    setSelectedId(cueId);
  };

  const handleNext = () => {
    let isPerfect = false;
    let updatedState = R.assocPath<string, RhythmWorkoutState>(
      ['log', 'practice', 'answers', state.currentIndex, 'selected'],
      selectedId
    )(state);

    // 最終以外
    if (!isLast) {
      updatedState = R.compose(
        R.assocPath<number, RhythmWorkoutState>(
          ['currentIndex'],
          state.currentIndex + 1
        ),
        R.assocPath<number, RhythmWorkoutState>(
          ['log', 'practice', 'answers', state.currentIndex + 1, 'createdAt'],
          new Date().getTime()
        )
      )(updatedState);
    }
    // 最終解答
    else {
      isPerfect = true;
      updatedState = R.compose(
        // シーンの更新
        R.assocPath<string, RhythmWorkoutState>(['pane'], 'result'),
        // ログの更新
        R.assocPath<number, RhythmWorkoutState>(
          ['log', 'result', 'createdAt'],
          new Date().getTime()
        )
      )(updatedState);

      Object.values(updatedState.log.practice.answers).forEach(
        (answer, index) => {
          if (answer.selected !== state.cueIds[index]) {
            isPerfect = false;
          }
        }
      );
    }

    dispatch(updatedState);
    setSelectedId('');
    setInitialize(true);

    const updatedRhythmWorkout = R.assocPath<RhythmWorkoutLog, RhythmWorkout>(
      ['logs', updatedState.log.id],
      updatedState.log
    )(appState.rhythmWorkouts[state.id]);
    setRhythmWorkout(updatedRhythmWorkout);

    let updatedAppState = R.assocPath<RhythmWorkout, State>(
      ['rhythmWorkouts', updatedRhythmWorkout.id],
      updatedRhythmWorkout
    )(appState);

    // 全問正解の場合
    if (isPerfect) {
      const workoutListIds = Object.values(appState.rhythmWorkouts)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((item) => item.id);
      const targetWorkoutIndex = workoutListIds.indexOf(state.id);
      const nextWorkoutId = workoutListIds[targetWorkoutIndex + 1];

      // rhythmWorkouts の createdAt 順で後ろがいれば、
      if (!!nextWorkoutId) {
        // isLocked を false にする
        const updatedNextWorkout = R.assocPath<boolean, RhythmWorkout>(
          ['isLocked'],
          false
        )(appState.rhythmWorkouts[nextWorkoutId]);
        setRhythmWorkout(updatedNextWorkout);

        updatedAppState = R.assocPath<RhythmWorkout, State>(
          ['rhythmWorkouts', updatedNextWorkout.id],
          updatedNextWorkout
        )(updatedAppState);
      }
    }

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
        <span>{state.cueIds.length}</span>
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
        {Object.values(PITCHES)
          .filter((item) => state.cueIds.includes(item.id))
          .map((card, index) => (
            <RhythmWorkoutPracticeRow
              key={index}
              pitchStr={card.pitchStr}
              isSelected={selectedId === card.id}
              handleClickRow={() => handleClickRow(card.id)}
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

export default RhythmWorkoutPractice;
