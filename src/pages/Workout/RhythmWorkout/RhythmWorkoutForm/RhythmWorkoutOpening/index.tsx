import * as R from 'ramda';
import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { Button, Card, CardContent } from '@mui/material';
import React, { useContext } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { RhythmWorkoutState } from '../../Model';
import { PITCHES } from '../../../../../assets/pitches';
import { createSourceNode } from '../../../../../services/utils';
import { AppContext } from '../../../../../App';
import { RhythmWorkout, RhythmWorkoutLog, State } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { setRhythmWorkout } from '../../../../../services/rhythmWorkout';

const RhythmWorkoutOpening = ({
  state,
  dispatch,
}: {
  state: RhythmWorkoutState;
  dispatch: React.Dispatch<RhythmWorkoutState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const cues = Object.values(PITCHES).filter((item) =>
    state.cueIds.includes(item.id)
  );

  const play = async (
    start: number,
    end: number,
    blob: Blob,
    audioContext: AudioContext
  ) => {
    const sourceNode = await createSourceNode(blob, audioContext);
    sourceNode.start(0, start, end - start);
  };

  const handleClick = (cueId: string) => {
    if (!state.blob || !state.audioContext) return;
    const cue = PITCHES[cueId];
    play(cue.start, cue.end, state.blob, state.audioContext);

    const updatedTapped = [...state.log.opening.tapped];
    updatedTapped.push(cueId);
    const updatedState = R.assocPath<string[], RhythmWorkoutState>(
      ['log', 'opening', 'tapped'],
      updatedTapped
    )(state);
    dispatch(updatedState);
  };

  const handleNext = () => {
    const updatedState = R.compose(
      R.assocPath<string, RhythmWorkoutState>(['pane'], 'practice'),
      R.assocPath<number, RhythmWorkoutState>(
        ['log', 'practice', 'answers', 0, 'createdAt'],
        new Date().getTime()
      )
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

  return (
    <div style={{ display: 'grid', rowGap: 48 }}>
      <div style={{ fontFamily: 'serif', color: '#555' }}>
        請點觸各個聲音，確認有什麼差異
      </div>
      <div style={{ display: 'grid', rowGap: 16 }}>
        {cues.map((cue, index) => (
          <div key={index}>
            <Card
              onClick={() => handleClick(cue.id)}
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
                <SentencePitchLine
                  pitchesArray={string2PitchesArray(cue.pitchStr)}
                />
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

export default RhythmWorkoutOpening;
