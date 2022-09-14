import * as R from 'ramda';
import React, { useContext } from 'react';
import { Button, Card, CardContent, useTheme } from '@mui/material';

import { KanaWorkoutState } from '../../Model';
import { AppContext } from '../../../../../App';
import { KANAS } from '../../../../../assets/kanas';
import { createSourceNode } from '../../../../../services/utils';
import { KanaWorkout, KanaWorkoutLog, State } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { setKanaWorkout } from '../../../../../services/kanaWorkout';

const KanaWorkoutOpening = ({
  state,
  dispatch,
}: {
  state: KanaWorkoutState;
  dispatch: React.Dispatch<KanaWorkoutState>;
}) => {
  const theme = useTheme();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const orderedKanas = Object.values(KANAS)
    .filter(
      (item) =>
        state.kanas.includes(item.hira) || state.kanas.includes(item.kata)
    )
    .map((item) => (state.kanas.includes(item.hira) ? item.hira : item.kata));

  const play = async (
    start: number,
    end: number,
    blob: Blob,
    audioContext: AudioContext
  ) => {
    const sourceNode = await createSourceNode(blob, audioContext);
    sourceNode.start(0, start, end - start);
  };

  const handleClick = (kana: string) => {
    if (!state.blob || !state.audioContext) return;
    const _kana = Object.values(KANAS).find((item) =>
      [item.hira, item.kata].includes(kana)
    );
    if (!_kana) return;
    play(_kana.start, _kana.end, state.blob, state.audioContext);

    const updatedTapped = [...state.log.opening.tapped];
    updatedTapped.push(kana);
    const updatedState = R.assocPath<string[], KanaWorkoutState>(
      ['log', 'opening', 'tapped'],
      updatedTapped
    )(state);
    dispatch(updatedState);
  };

  const handleNext = () => {
    const updatedState = R.compose(
      R.assocPath<string, KanaWorkoutState>(['pane'], 'practice'),
      R.assocPath<number, KanaWorkoutState>(
        ['log', 'practice', 'answers', 0, 'createdAt'],
        new Date().getTime()
      )
    )(state);
    dispatch(updatedState);

    const updatedKanaWorkout = R.assocPath<KanaWorkoutLog, KanaWorkout>(
      ['logs', updatedState.log.id],
      updatedState.log
    )(appState.kanaWorkouts[state.id]);

    const updatedAppState = R.assocPath<KanaWorkout, State>(
      ['kanaWorkouts', updatedKanaWorkout.id],
      updatedKanaWorkout
    )(appState);
    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    setKanaWorkout(updatedKanaWorkout);
  };

  return (
    <div style={{ display: 'grid', rowGap: 48 }}>
      <div style={{ fontFamily: 'serif', color: '#555' }}>
        請點觸各個聲音，確認有什麼差異
      </div>
      <div style={{ display: 'grid', rowGap: 16 }}>
        {orderedKanas.map((kana, index) => (
          <div key={index}>
            <Card
              onClick={() => handleClick(kana)}
              sx={{
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: -1,
                }}
              >
                <div
                  style={{
                    ...(theme.typography as any).notoSerifJP,
                    fontSize: 24,
                    color: '#555',
                    userSelect: 'none',
                  }}
                >
                  {kana}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Button variant='contained' sx={{ color: 'white' }} onClick={handleNext}>
        開始練習
      </Button>
    </div>
  );
};

export default KanaWorkoutOpening;
