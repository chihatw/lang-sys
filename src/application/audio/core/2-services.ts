import { CHIN_SAN_VOICES } from 'assets/chinSanVoices';
import { MutableRefObject } from 'react';

export const createSourceNode = (audioBuffer: AudioBuffer) => {
  const audioContext = new AudioContext();
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  return sourceNode;
};

export const blobToAudioBuffer = async (blob: Blob) => {
  const audioContext = new AudioContext();
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const playAudioBufferAndSetSourceNode = async (
  audioBuffer: AudioBuffer,
  start: number,
  stop: number,
  sourceNodeRef: React.MutableRefObject<AudioBufferSourceNode | null>,
  callback?: () => void
) => {
  const audioContext = new AudioContext();
  const sourceNode = await createSourceNode(audioBuffer);
  sourceNodeRef.current = sourceNode;
  const currentTime = audioContext.currentTime;
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
  callback: (blob: Blob, audioBuffer: AudioBuffer) => void
) => {
  // データが入力された時の処理
  mediaRecorder.ondataavailable = async (event: BlobEvent) => {
    const blob = event.data;
    if (!blob) return;
    const audioBuffer = await blobToAudioBuffer(blob);
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

export const updateElapsedTime = (
  elapsedStartTimeRef: React.MutableRefObject<number>,
  elapsedTimeRef: React.MutableRefObject<number>
) => {
  const currentTime = performance.now() / 1000;
  // 経過時間を累積経過時間に追加
  elapsedTimeRef.current += currentTime - elapsedStartTimeRef.current;
  // 経過時間起点を更新
  elapsedStartTimeRef.current = currentTime;
};
