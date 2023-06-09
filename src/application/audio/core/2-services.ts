import { MutableRefObject } from 'react';

import { CHIN_SAN_VOICES } from '../../../assets/chinSanVoices';

export const createAudioContext = () => {
  const audioContext = new window.AudioContext();
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.value = 0;
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.01);
  return audioContext;
};

export const createSourceNode = (
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
) => {
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  return sourceNode;
};

export const blobToAudioBuffer = async (
  blob: Blob,
  audioContext: AudioContext
) => {
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const playAudioBufferAndSetSourceNode = async (
  audioBuffer: AudioBuffer,
  audioContext: AudioContext,
  start: number,
  stop: number,
  sourceNodeRef: React.MutableRefObject<AudioBufferSourceNode | null>,
  callback?: () => void
) => {
  const sourceNode = await createSourceNode(audioBuffer, audioContext);
  sourceNodeRef.current = sourceNode;
  const currentTime = audioContext!.currentTime;
  if (callback) {
    sourceNode.onended = callback;
  }
  sourceNode.start(currentTime, start);
  sourceNode.stop(currentTime + stop - start);
};

export const pauseSourceNode = (
  sourceNodeRef: React.MutableRefObject<AudioBufferSourceNode | null>
) => {
  const sourceNode = sourceNodeRef.current;
  sourceNode && sourceNode.stop(0);
  sourceNodeRef.current = null;
};

export const getStartAndStopFromChenSanVoices = (pitchStr: string) => {
  const target = Object.values(CHIN_SAN_VOICES).find(
    (item) => item.pitchStr === pitchStr
  );
  if (!target) return { start: 0, stop: 0 };
  const { start, stop } = target.schedules[0];
  return { start, stop };
};

export const createMediaRecorder = async (
  audioElemRef: MutableRefObject<HTMLAudioElement>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>
) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  const mediaRecorder = new MediaRecorder(stream);
  // streamと連携してマイクを切るため
  audioElemRef.current.srcObject = stream;
  mediaRecorderRef.current = mediaRecorder;
  return mediaRecorder;
};

export const startRecording = async (
  mediaRecorder: MediaRecorder,
  audioContext: AudioContext,
  callback: (blob: Blob, audioBuffer: AudioBuffer) => void
) => {
  // データが入力された時の処理
  mediaRecorder.ondataavailable = async (event: BlobEvent) => {
    const blob = event.data;
    if (!blob) return;
    const audioBuffer = await blobToAudioBuffer(blob, audioContext);
    if (!audioBuffer) return;
    callback(blob, audioBuffer);
  };
  // 録音開始
  mediaRecorder.start();
};

export const clearMediaRecorder = (
  audioElemRef: MutableRefObject<HTMLAudioElement>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>
) => {
  let mediaRecorder = mediaRecorderRef.current;
  let audioElem = audioElemRef.current;
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
