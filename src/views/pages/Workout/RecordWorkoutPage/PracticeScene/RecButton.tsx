import { Button } from '@mui/material';
import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main';

import {
  startRecording,
  clearMediaRecorder,
  createMediaRecorder,
} from 'application/audio/core/2-services';

import { recordWorkoutPracticeActions } from 'application/recordWorkoutPractice/framework/0-reducer';
import { audioActions } from 'application/audio/framework/0-reducer';

const RecButton = () => {
  const dispatch = useDispatch();
  const { currentIndex, shuffledCueIds, isRunning } = useSelector(
    (state: RootState) => state.recordWorkoutPractice
  );

  const buttonLabel = useMemo(() => {
    if (!isRunning) return '開始錄音';
    if (currentIndex + 1 !== shuffledCueIds.length) return '下一個';
    return '停止錄音';
  }, [isRunning, currentIndex, shuffledCueIds]);

  // streamと連携してマイクを切るため
  const audioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const start = async () => {
    if (!navigator.mediaDevices) return;
    const mediaRecorder = await createMediaRecorder(
      audioElemRef,
      mediaRecorderRef
    );
    await startRecording(
      mediaRecorder,
      (blob: Blob, audioBuffer: AudioBuffer) => {
        dispatch(audioActions.setBlob(blob));
        dispatch(recordWorkoutPracticeActions.setAudioBuffer(audioBuffer));
      }
    );

    dispatch(recordWorkoutPracticeActions.startRecording());
  };

  const next = () => {
    dispatch(recordWorkoutPracticeActions.increseCurrentIndex());
  };

  const stop = async () => {
    clearMediaRecorder(audioElemRef, mediaRecorderRef);
    dispatch(recordWorkoutPracticeActions.stopRecording());
  };

  const handleClickPlayButton = () => {
    if (!isRunning) {
      start();
      return;
    }
    if (currentIndex + 1 !== shuffledCueIds.length) {
      next();
      return;
    }
    stop();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button
        color='primary'
        variant='contained'
        onClick={handleClickPlayButton}
        sx={{
          color: 'white',
          width: 120,
          fontSize: 18,
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default RecButton;
