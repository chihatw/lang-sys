import * as R from 'ramda';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PITCHES } from '../../../../../assets/pitches';
import { createSourceNode } from '../../../../../services/utils';
import { RhythmWorkoutState } from '../../Model';
import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import RhythmWorkoutPracticeRow from './RhythmWorkoutPracticeRow';
import { AppContext } from '../../../../../App';
import { RhythmWorkout, RhythmWorkoutLog, State } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { setRhythmWorkout } from '../../../../../services/rhythmWorkout';

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
    let updatedState = R.assocPath<string, RhythmWorkoutState>(
      ['log', 'practice', 'answers', state.currentIndex, 'selected'],
      selectedId
    )(state);

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
    } else {
      updatedState = R.compose(
        R.assocPath<string, RhythmWorkoutState>(['pane'], 'result'),
        R.assocPath<number, RhythmWorkoutState>(
          ['log', 'result', 'createdAt'],
          new Date().getTime()
        )
      )(updatedState);
    }
    dispatch(updatedState);
    setSelectedId('');
    setInitialize(true);

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
