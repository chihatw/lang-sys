import * as R from 'ramda';
import { useTheme } from '@mui/material';
import { MutableRefObject, useContext, useRef, useState } from 'react';
import { AppContext } from '../../../..';
import CueCard from './CueCard';
import RecButton from './RecButton';
import CheckPane from './CheckPane';

import { uploadStorage } from '../../../../../repositories/storage';
import { State } from '../../../../../Model';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../../../../Update';
import { blobToAudioBuffer } from '../../../../../application/audio/core/2-services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../main';
import { RECORD_WORKOUT_STORAGE_PATH } from '../../../../../application/recordWorkouts/core/1-constants';
import { recordWorkoutPracticeActions } from '../../../../../application/recordWorkoutPractice/framework/0-reducer';

const CUE_CARD_HEIGHT = 200;
const PracticeScene = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const { audioContext } = useSelector((state: RootState) => state.audio);
  const { workoutId, currentIndex, shuffledCueIds, isRunning, isChecking } =
    useSelector((state: RootState) => state.recordWorkoutPractice);
  const [blob, setBlob] = useState<Blob | null>(null); // upload 用
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null); // play 用

  const pitchStr = shuffledCueIds[currentIndex];
  const isLast = currentIndex + 1 === shuffledCueIds.length;

  // streamと連携してマイクを切るため
  const micAudioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const start = async () => {
    if (!navigator.mediaDevices || !audioContext) return;
    await startRecording(
      audioContext,
      micAudioElemRef,
      mediaRecorderRef,
      setAudioBuffer,
      setBlob
    );

    dispatch(recordWorkoutPracticeActions.startRecording());
  };

  const stop = async () => {
    stopRecording(micAudioElemRef, mediaRecorderRef);

    // local
    dispatch(recordWorkoutPracticeActions.stopRecording());
  };

  const handleClickPlayButton = () => {
    if (!isRunning) {
      start();
      return;
    }
    if (!isLast) {
      dispatch(recordWorkoutPracticeActions.increseCurrentIndex());
      return;
    }
    stop();
  };

  const abandonRecordedAudioBuffer = () => {
    // local
    setAudioBuffer(null);
    setBlob(null);
    dispatch(recordWorkoutPracticeActions.abandomRecordedAudioBuffer());
  };

  const saveRecordedAudioBuffer = async () => {
    if (!blob || !audioBuffer) return;
    // workoutId １つに対して、１つの stroragePath しかないので、上書きになる
    const storagePath = RECORD_WORKOUT_STORAGE_PATH + workoutId;

    // storage
    // todo middleware
    await uploadStorage(blob, storagePath);

    // 先に作成
    // todo middleware
    const updatedAppState = R.assocPath<AudioBuffer, State>(
      ['audioBuffers', storagePath],
      audioBuffer
    )(appState);

    dispatch(recordWorkoutPracticeActions.saveRecordedAudioBuffer());

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
      {/* currentIndex/total */}
      <div style={{ fontSize: 48, textAlign: 'center', color: '#aaa' }}>{`${
        currentIndex + 1
      }/${shuffledCueIds.length}`}</div>

      {/* CueCard */}
      <div style={{ height: CUE_CARD_HEIGHT }}>
        {isRunning && <CueCard pitchStr={pitchStr} height={CUE_CARD_HEIGHT} />}
      </div>

      {/* button */}
      <RecButton
        // isRunning={isRunning}
        handleClickPlayButton={handleClickPlayButton}
      />

      {/* todo これシーン分ける？ */}
      {!!audioBuffer && !!audioContext && (
        <CheckPane
          audioBuffer={audioBuffer}
          saveRecordedAudioBuffer={saveRecordedAudioBuffer}
          abandonRecordedAudioBuffer={abandonRecordedAudioBuffer}
        />
      )}
    </div>
  );
};

export default PracticeScene;

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
