import gojuuon from '../../../../assets/audios/gojuuon.mp3';
import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import ta_pitches_120 from '../../../../assets/audios/ta_pitches_120.mp3';
import pitch_input_100 from '../../../../assets/audios/pitch_input_100.mp3';
import chinSan_voice from '../../../../assets/audios/chinSan_voice.mp3';

import { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../..';

import { WorkoutState, INITIAL_WORKOUT_STATE } from './Model';
import WorkoutForm from './WorkoutForm';
import { SCENE, TYPE } from '../commons';
import { useWorkout } from '../../../../services/workout';
import { shuffle } from '../../../../services/utils';
import { INITIAL_WORKOUT_LOG, Workout } from '../../../../Model';
import { nanoid } from 'nanoid';
import { useAudioBuffer } from '../../../../services/audioBuffer';
import { buildKanaCues } from '../../../../assets/kanas';
import { PITCHES, PITCH_WORKOUT_ITEMS } from '../../../../assets/pitches';
import { PITCH_INPUT_ITEMS } from '../../../../assets/pitchInputItems';
import { CHIN_SAN_VOICES } from '../../../../assets/chinSanVoices';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../main';
import TouchMe from '../../../components/TouchMe';

const reducer = (state: WorkoutState, action: WorkoutState) => action;

const WorkoutPage = ({ type }: { type: string }) => {
  const { workoutId } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const [formState, formDispatch] = useReducer(reducer, INITIAL_WORKOUT_STATE);
  const [path, setPath] = useState('');

  const workout = useWorkout(workoutId, state, dispatch, type);
  const audioBuffer = useAudioBuffer(path, state, dispatch);

  useEffect(() => {
    const path = audioPathSwitch(type);
    if (!path) return;
    setPath(path);
  }, [type]);

  /** 代入 */
  useEffect(() => {
    if (!workout.id || !audioBuffer) return;
    if (formState.scene !== SCENE.opening) return;
    const newFormState = buildWorkoutState(workout, type, audioBuffer);
    formDispatch(newFormState);
  }, [workout, audioBuffer]);

  if (!currentUser) return <Navigate to='/signIn' />;

  if (!state.audioContext) return <TouchMe />;

  return <WorkoutForm state={formState} dispatch={formDispatch} type={type} />;
};

export default WorkoutPage;

const buildWorkoutState = (
  workout: Workout,
  type: string,
  audioBuffer: AudioBuffer
) => {
  const kanas = buildKanas(workout, type);
  const cueIds = buildCueIds(workout, type);
  const cues = buildCues(kanas, cueIds, type);

  const workoutState: WorkoutState = {
    id: workout.id,
    cues,
    scene: SCENE.opening,
    workout,
    audioBuffer,
    currentIndex: 0,
    log: {
      ...INITIAL_WORKOUT_LOG,
      id: nanoid(8),
      kanas,
      cueIds,
      createdAt: new Date().getTime(),
    },
  };
  return workoutState;
};

const buildKanas = (workout: Workout, type: string) => {
  switch (type) {
    case TYPE.kana:
      return shuffle(workout.kanas);
    case TYPE.pitch:
    case TYPE.pitchInput:
    case TYPE.record:
    case TYPE.rhythm:
      return [];
    default:
      console.error(`incorrect type: ${type}`);
      return [];
  }
};

const buildCueIds = (workout: Workout, type: string) => {
  switch (type) {
    case TYPE.kana:
      return [];
    case TYPE.pitch:
    case TYPE.record:
    case TYPE.rhythm:
    case TYPE.pitchInput:
      return shuffle(workout.cueIds);
    default:
      console.error(`incorrect type: ${type}`);
      return [];
  }
};

const buildCues = (
  kanas: string[],
  cueIds: string[],
  type: string
): {
  id: string;
  pitchStr: string;
}[] => {
  let pitchCues: {
    id: string;
    pitchStr: string;
  }[] = [];

  switch (type) {
    case TYPE.kana:
      const kanaCues = buildKanaCues(kanas);
      return kanaCues;
    case TYPE.pitch:
      pitchCues = cueIds.map((cueId) => {
        const cue = Object.values(PITCH_WORKOUT_ITEMS).find(
          (item) => item.pitchStr === cueId
        );
        if (!cue) return { id: '', pitchStr: '' };
        return { id: cue.pitchStr, pitchStr: cue.pitchStr };
      });
    case TYPE.rhythm:
      pitchCues = cueIds.map((cueId) => {
        const cue = Object.values(PITCHES).find(
          (item) => item.pitchStr === cueId
        );
        if (!cue) return { id: '', pitchStr: '' };
        return { id: cue.pitchStr, pitchStr: cue.pitchStr };
      });
    case TYPE.record:
      pitchCues = cueIds.map((cueId) => {
        const cue = Object.values(CHIN_SAN_VOICES).find(
          (item) => item.pitchStr === cueId
        );
        if (!cue) return { id: '', pitchStr: '' };
        return { id: cue.pitchStr, pitchStr: cue.pitchStr };
      });
      return pitchCues;
    case TYPE.pitchInput:
      pitchCues = cueIds.map((cueId) => {
        const cue = Object.values(PITCH_INPUT_ITEMS).find(
          (item) => item.pitchStr === cueId
        );
        if (!cue) return { id: '', pitchStr: '' };
        return { id: cue.pitchStr, pitchStr: cue.pitchStr };
      });
      return pitchCues;
    default:
      console.error(`incorrect type: ${type}`);
      return [];
  }
};

const audioPathSwitch = (type: string) => {
  switch (type) {
    case TYPE.kana:
      return gojuuon;
    case TYPE.pitch:
      return ta_pitches_120;
    case TYPE.pitchInput:
      return pitch_input_100;
    case TYPE.rhythm:
      return downpitch_120;
    case TYPE.record:
      return chinSan_voice;
    default:
      console.error(`incorrect type: ${type}`);
      return undefined;
  }
};
