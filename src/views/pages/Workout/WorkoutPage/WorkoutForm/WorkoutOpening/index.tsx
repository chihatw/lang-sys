import * as R from 'ramda';

import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardContent, useTheme } from '@mui/material';
import { AppContext } from '../../../../..';
import { WorkoutState } from '../../Model';
import {
  TYPE,
  SCENE,
  inputSwitch,
  updateWorkoutLog,
  setSceneToWorkoutState,
} from '../../../commons';

import { KANAS } from '../../../../../../assets/kanas';
import { PITCHES, PITCH_WORKOUT_ITEMS } from '../../../../../../assets/pitches';
import { CHIN_SAN_VOICES } from '../../../../../../assets/chinSanVoices';
import { PITCH_INPUT_ITEMS } from '../../../../../../assets/pitchInputItems';
import SentencePitchLine from '../../../../../components/SentencePitchLine';
import { playAudioBuffer } from '../../../../../../application/audio/core/2-services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../main';

const WorkoutOpening = ({
  state,
  dispatch,
  type,
}: {
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
  type: string;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const { audioContext } = useSelector((state: RootState) => state.audio);

  const [sortedCues, setSortedCues] = useState<
    {
      id: string;
      pitchStr: string;
    }[]
  >([]);

  useEffect(() => {
    const clonedCues = [...state.cues];
    let sortedCues: {
      id: string;
      pitchStr: string;
    }[] = [];
    switch (type) {
      case TYPE.kana:
        sortedCues = clonedCues.sort((a, b) => {
          const kanaA = Object.values(KANAS).find((item) =>
            [item.hira, item.kata].includes(a.id)
          );
          const kanaB = Object.values(KANAS).find((item) =>
            [item.hira, item.kata].includes(b.id)
          );
          return kanaA!.start - kanaB!.start;
        });
        break;
      case TYPE.pitch:
        sortedCues = buildSortedCues(PITCH_WORKOUT_ITEMS, state.cues);
        break;
      case TYPE.rhythm:
        sortedCues = buildSortedCues(PITCHES, state.cues);
        break;
      case TYPE.record:
        sortedCues = buildSortedCues(CHIN_SAN_VOICES, state.cues);
        break;
      case TYPE.pitchInput:
        sortedCues = buildSortedCues(PITCH_INPUT_ITEMS, state.cues);
        break;
      default:
        console.error(`incorrect type: ${type}`);
    }
    setSortedCues(sortedCues);
  }, [state, type]);

  const handleClick = (cueId: string) => {
    if (!state.audioBuffer || !audioContext) return;
    playAudioBuffer(cueId, state.audioBuffer, audioContext);

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
    // local
    dispatch(updatedState);

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
    <div style={{ display: 'grid', rowGap: 48 }}>
      <div style={{ fontFamily: 'serif', color: '#555' }}>
        {state.cues.length > 1 ? '請點觸各個聲音，確認差異' : '請確認聲音'}
      </div>
      <div style={{ display: 'grid', rowGap: 16 }}>
        {sortedCues.map((cue, index) => (
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
                <Display type={type} input={inputSwitch(type, cue)} />
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
    case TYPE.record:
      return <SentencePitchLine pitchStr={input} />;
    default:
      console.error(`incorrect type: ${type}`);
      return <></>;
  }
};

const buildSortedCues = (
  pitchObj: { [id: string]: { pitchStr: string } },
  cues: { id: string; pitchStr: string }[]
) => {
  const cloned = [...cues];
  const pitchStrArray = Object.values(pitchObj).map((item) => item.pitchStr);
  const sortedCues = cloned.sort(
    (a, b) =>
      pitchStrArray.indexOf(a.pitchStr) - pitchStrArray.indexOf(b.pitchStr)
  );
  return sortedCues;
};
