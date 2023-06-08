import chinSan_voice from '../../../../assets/audios/chinSan_voice.mp3';

import { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../..';

import { WorkoutState, INITIAL_WORKOUT_STATE } from './Model';
import WorkoutForm from './WorkoutForm';
import { SCENE } from '../commons';
import { useWorkout } from '../../../../services/workout';
import { shuffle } from '../../../../services/utils';
import { INITIAL_WORKOUT_LOG, Workout } from '../../../../Model';
import { nanoid } from 'nanoid';
import { useAudioBuffer } from '../../../../services/audioBuffer';

import { CHIN_SAN_VOICES } from '../../../../assets/chinSanVoices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../main';
import TouchMe from '../../../components/TouchMe';
import { recordWorkoutPracticeActions } from '../../../../application/recordWorkoutPractice/framework/0-reducer';

const reducer = (state: WorkoutState, action: WorkoutState) => action;

const WorkoutPage = ({ type }: { type: string }) => {
  const { workoutId } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const _dispatch = useDispatch();
  const { audioContext } = useSelector((state: RootState) => state.audio);

  useEffect(() => {
    if (!workoutId) return;
    _dispatch(recordWorkoutPracticeActions.fetchRecordWorkout(workoutId));
  }, [workoutId]);

  const [formState, formDispatch] = useReducer(reducer, INITIAL_WORKOUT_STATE);
  const [path, setPath] = useState('');

  const workout = useWorkout(workoutId, state, dispatch, type);
  const audioBuffer = useAudioBuffer(path, state, audioContext, dispatch);

  useEffect(() => {
    const path = chinSan_voice;
    if (!path) return;
    setPath(path);
  }, [type]);

  /** 代入 */
  useEffect(() => {
    if (!workout.id || !audioBuffer) return;
    if (formState.scene !== SCENE.opening) return;
    const newFormState = buildWorkoutState(workout, audioBuffer);
    formDispatch(newFormState);
  }, [workout, audioBuffer]);

  if (!audioContext) return <TouchMe />;

  return <WorkoutForm state={formState} dispatch={formDispatch} type={type} />;
};

export default WorkoutPage;

const buildWorkoutState = (workout: Workout, audioBuffer: AudioBuffer) => {
  const cueIds = shuffle(workout.cueIds);
  const cues = buildCues(cueIds);

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
      kanas: [],
      cueIds,
      createdAt: new Date().getTime(),
    },
  };
  return workoutState;
};

const buildCues = (
  cueIds: string[]
): {
  id: string;
  pitchStr: string;
}[] => {
  return cueIds
    .map((cueId) =>
      Object.values(CHIN_SAN_VOICES).find((item) => item.pitchStr === cueId)
    )
    .filter((cue) => !!cue)
    .map((cue) => ({ id: cue!.pitchStr, pitchStr: cue!.pitchStr }));
};
