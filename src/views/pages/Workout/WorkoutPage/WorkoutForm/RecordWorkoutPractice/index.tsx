import * as R from 'ramda';
import { useTheme } from '@mui/material';
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppContext } from '../../../../..';
import { WorkoutState } from '../../Model';
import CueCard from './CueCard';
import RecButton from './RecButton';
import CheckPane from './CheckPane';
import { blobToAudioBuffer } from '../../../../../../services/utils';
import { uploadStorage } from '../../../../../../repositories/storage';
import { State } from '../../../../../../Model';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../../../../../Update';

const CUE_CARD_HEIGHT = 200;

const RecordWorkoutPractice = ({
  state,
  dispatch,
}: {
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutState>;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [blob, setBlob] = useState<Blob | null>(null); // upload 用
  const [isRunning, setIsRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  // const [pitchArray, setPitchArray] = useState<string[][][]>([]);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null); // play 用

  // streamと連携してマイクを切るため
  const micAudioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // useEffect(() => {
  const cue = state.cues[state.currentIndex];
  // const pitchArray = string2PitchesArray(cue.pitchStr);
  // setPitchArray(pitchArray);
  // }, [state.cues, state.currentIndex]);

  const isLast = state.currentIndex + 1 === state.cues.length;

  const start = async () => {
    if (!navigator.mediaDevices || !appState.audioContext) return;
    await startRecording(
      appState.audioContext,
      micAudioElemRef,
      mediaRecorderRef,
      setAudioBuffer,
      setBlob
    );

    // local
    setIsRunning(true);
  };

  const next = () => {
    const updatedState = R.assocPath<number, WorkoutState>(
      ['currentIndex'],
      state.currentIndex + 1
    )(state);

    // form
    dispatch(updatedState);
  };

  const stop = async () => {
    stopRecording(micAudioElemRef, mediaRecorderRef);

    // local
    setIsChecking(true);
  };

  const handleClickPlayButton = () => {
    if (!isRunning) {
      start();
      return;
    }

    if (!isLast) {
      next();
      return;
    }
    stop();
  };

  const abandonRecordedAudioBuffer = () => {
    // local
    setIsRunning(false);
    setIsChecking(false);
    setAudioBuffer(null);
    setBlob(null);

    // form
    const updatedState = R.assocPath<number, WorkoutState>(
      ['currentIndex'],
      0
    )(state);
    dispatch(updatedState);
  };

  const saveRecordedAudioBuffer = async () => {
    if (!blob || !audioBuffer) return;
    // workoutId １つに対して、１つの stroragePath しかないので、上書きになる
    const storagePath = `/recordWorkout/${state.id}`;

    // storage
    await uploadStorage(blob, storagePath);

    // 先に作成
    const updatedAppState = R.assocPath<AudioBuffer, State>(
      ['audioBuffers', storagePath],
      audioBuffer
    )(appState);

    // local
    setIsRunning(false);
    setIsChecking(false);
    setAudioBuffer(null);
    setBlob(null);

    // form
    const updatedState = R.assocPath<number, WorkoutState>(
      ['currentIndex'],
      0
    )(state);
    dispatch(updatedState);

    navigate('/list/record');

    // app
    setTimeout(() => {
      appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
    }, 200);
  };

  return (
    <div
      style={{
        ...(theme.typography as any).notoSerifJP,
        display: 'grid',
        rowGap: 8,
      }}
    >
      <div style={{ fontSize: 48, textAlign: 'center', color: '#aaa' }}>{`${
        state.currentIndex + 1
      }/${state.cues.length}`}</div>
      <div style={{ height: CUE_CARD_HEIGHT }}>
        {isRunning && (
          <CueCard pitchStr={cue.pitchStr} height={CUE_CARD_HEIGHT} />
        )}
      </div>
      <RecButton
        hasNext={!isLast}
        isRunning={isRunning}
        handleClickPlayButton={handleClickPlayButton}
      />
      {!!audioBuffer && !!appState.audioContext && (
        <CheckPane
          state={state}
          isChecking={isChecking}
          audioBuffer={audioBuffer}
          saveRecordedAudioBuffer={saveRecordedAudioBuffer}
          abandonRecordedAudioBuffer={abandonRecordedAudioBuffer}
        />
      )}
    </div>
  );
};

export default RecordWorkoutPractice;

const startRecording = async (
  audioContext: AudioContext,
  micAudioElemRef: MutableRefObject<HTMLAudioElement>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  setAudioBuffer: (value: AudioBuffer | null) => void,
  setBlob: (value: Blob | null) => void
) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  const mediaRecorder = new MediaRecorder(stream);

  // データが入力された時の処理
  mediaRecorder.ondataavailable = async (event: BlobEvent) => {
    const blob = event.data;
    if (!blob) return;

    const audioBuffer = await blobToAudioBuffer(blob, audioContext);
    if (!audioBuffer) return;
    setAudioBuffer(audioBuffer);
    setBlob(blob);
  };

  // 録音開始
  mediaRecorder.start();

  // streamと連携してマイクを切るため
  mediaRecorderRef.current = mediaRecorder;
  micAudioElemRef.current.srcObject = stream;
};

const stopRecording = (
  micAudioElemRef: MutableRefObject<HTMLAudioElement>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>
) => {
  let mediaRecorder = mediaRecorderRef.current;
  let audioElem = micAudioElemRef.current;
  if (!mediaRecorder) return;
  mediaRecorder.stop();
  const stream = audioElem.srcObject as MediaStream;
  stream.getTracks().forEach((track) => {
    track.stop();
  });
  // ブラウザのマイク使用中の表示を消すために必要
  audioElem.srcObject = null;
  mediaRecorder = null;
};
