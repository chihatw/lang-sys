import * as R from 'ramda';
import string2PitchesArray from 'string2pitches-array';
import React, { useContext } from 'react';
import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { Button, Card, CardContent, useTheme } from '@mui/material';
import { AppContext } from '../../../../../App';
import { WorkoutState } from '../../Model';
import {
  TYPE,
  SCENE,
  getCues,
  getInput,
  getAppWorkouts,
  updateWorkoutLog,
  setSceneToWorkoutState,
} from '../../../commons';
import { ActionTypes } from '../../../../../Update';
import { playAudioBuffer } from '../../../../../services/utils';

const WorkoutOpening = ({
  type,
  state,
  dispatch,
}: {
  type: string;
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const handleClick = (cueId: string) => {
    if (!state.audioBuffer || !state.audioContext) return;
    playAudioBuffer(type, cueId, state.audioBuffer, state.audioContext);

    const updatedTapped = [...state.log.opening.tapped];
    updatedTapped.push(cueId);
    const updatedState = R.assocPath<string[], WorkoutState>(
      ['log', 'opening', 'tapped'],
      updatedTapped
    )(state);
    dispatch(updatedState);
  };

  const handleNext = () => {
    const updatedState = setSceneToWorkoutState(state, SCENE.practice);
    dispatch(updatedState);

    const workouts = getAppWorkouts(type, appState);
    const updatedAppState = updateWorkoutLog(
      type,
      updatedState.log,
      workouts[state.id],
      appState
    );

    appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
  };

  return (
    <div style={{ display: 'grid', rowGap: 48 }}>
      <div style={{ fontFamily: 'serif', color: '#555' }}>
        請點觸各個聲音，確認差異
      </div>
      <div style={{ display: 'grid', rowGap: 16 }}>
        {getCues(type, state).map((cue, index) => (
          <div key={index}>
            <Card
              onClick={() => handleClick(cue.id)}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: -1,
                }}
              >
                <Display type={type} input={getInput(type, cue)} />
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

export default WorkoutOpening;

const Display = ({ type, input }: { type: string; input: string }) => {
  const theme = useTheme();
  switch (type) {
    case TYPE.kana:
      return (
        <div
          style={{
            ...(theme.typography as any).notoSerifJP,
            fontSize: 24,
            color: '#555',
            userSelect: 'none',
          }}
        >
          {input}
        </div>
      );
    case TYPE.pitch:
    case TYPE.rhythm:
    case TYPE.pitchInput:
      return <SentencePitchLine pitchesArray={string2PitchesArray(input)} />;
    default:
      return <></>;
  }
};
