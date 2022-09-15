import * as R from 'ramda';
import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { KanaWorkoutState } from '../../Model';
import { AppContext } from '../../../../../App';
import { KANAS } from '../../../../../assets/kanas';
import { createSourceNode } from '../../../../../services/utils';
import { KanaWorkout, KanaWorkoutLog, State } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { setKanaWorkout } from '../../../../../services/kanaWorkout';
import KanaWorkoutPracticeRow from './KanaWorkoutPracticeRow';

const KanaWorkoutPractice = ({
  state,
  dispatch,
}: {
  state: KanaWorkoutState;
  dispatch: React.Dispatch<KanaWorkoutState>;
}) => {
  const theme = useTheme();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const [initialize, setInitialize] = useState(true);
  const [selectedKana, setSelectedKana] = useState('');
  const AnimationElemRef = useRef<HTMLDivElement>(null);

  const currentKana = state.kanas[state.currentIndex];
  const currentKanaCue = Object.values(KANAS).find((item) =>
    [item.hira, item.kata].includes(currentKana)
  );

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

  if (!currentKanaCue) return <></>;

  const isLast = state.currentIndex + 1 === state.kanas.length;

  const play = async () => {
    if (!state.blob || !state.audioContext) return;
    const sourceNode = await createSourceNode(state.blob, state.audioContext);
    sourceNode.start(
      0,
      currentKanaCue.start,
      currentKanaCue.end - currentKanaCue.start
    );
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
    const updatedState = R.assocPath<number[], KanaWorkoutState>(
      ['log', 'practice', 'answers', state.currentIndex, 'playedAt'],
      updatedPlayedAt
    )(state);
    dispatch(updatedState);
  };

  const handleClickRow = (kana: string) => {
    kana = selectedKana === kana ? '' : kana;
    setSelectedKana(kana);
  };

  const handleNext = () => {
    let isPerfect = false;
    let updatedState = R.assocPath<string, KanaWorkoutState>(
      ['log', 'practice', 'answers', state.currentIndex, 'selected'],
      selectedKana
    )(state);

    // 最終以外
    if (!isLast) {
      updatedState = R.compose(
        R.assocPath<number, KanaWorkoutState>(
          ['currentIndex'],
          state.currentIndex + 1
        ),
        R.assocPath<number, KanaWorkoutState>(
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
        R.assocPath<string, KanaWorkoutState>(['pane'], 'result'),
        // ログの更新
        R.assocPath<number, KanaWorkoutState>(
          ['log', 'result', 'createdAt'],
          new Date().getTime()
        )
      )(updatedState);

      Object.values(updatedState.log.practice.answers).forEach(
        (answer, index) => {
          if (answer.selected !== state.kanas[index]) {
            isPerfect = false;
          }
        }
      );
    }

    dispatch(updatedState);
    setSelectedKana('');
    setInitialize(true);

    const updatedKanaWorkout = R.assocPath<KanaWorkoutLog, KanaWorkout>(
      ['logs', updatedState.log.id],
      updatedState.log
    )(appState.kanaWorkouts[state.id]);
    setKanaWorkout(updatedKanaWorkout);

    let updatedAppState = R.assocPath<KanaWorkout, State>(
      ['kanaWorkouts', updatedKanaWorkout.id],
      updatedKanaWorkout
    )(appState);

    // 全問正解の場合
    if (isPerfect) {
      const workoutListIds = Object.values(appState.kanaWorkouts)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((item) => item.id);
      const targetWorkoutIndex = workoutListIds.indexOf(state.id);
      const nextWorkoutId = workoutListIds[targetWorkoutIndex + 1];

      // kanaWorkouts の createdAt 順で後ろがいれば、
      if (!!nextWorkoutId) {
        // isLocked を false にする
        const updatedNextWorkout = R.assocPath<boolean, KanaWorkout>(
          ['isLocked'],
          false
        )(appState.kanaWorkouts[nextWorkoutId]);
        setKanaWorkout(updatedNextWorkout);

        updatedAppState = R.assocPath<KanaWorkout, State>(
          ['kanaWorkouts', updatedNextWorkout.id],
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
        <span>{state.kanas.length}</span>
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
        {Object.values(KANAS)
          .filter(
            (item) =>
              state.kanas.includes(item.hira) || state.kanas.includes(item.kata)
          )
          .map((kanaCue, index) => {
            const kana = state.kanas.includes(kanaCue.hira)
              ? kanaCue.hira
              : kanaCue.kata;
            return (
              <KanaWorkoutPracticeRow
                key={index}
                kana={kana}
                isSelected={kana === selectedKana}
                handleClickRow={() => handleClickRow(kana)}
              />
            );
          })}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}
      >
        <Button
          variant='contained'
          sx={{ color: 'white', width: 240 }}
          disabled={!selectedKana}
          onClick={handleNext}
        >
          {isLast ? '選好了' : '下一題'}
        </Button>
      </div>
    </div>
  );
};

export default KanaWorkoutPractice;
