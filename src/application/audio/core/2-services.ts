import { Schedule } from '../../../Model';
import { CHIN_SAN_VOICES } from '../../../assets/chinSanVoices';
import { playKana } from '../../../assets/kanas';
import { PITCH_INPUT_ITEMS } from '../../../assets/pitchInputItems';
import { PITCH_WORKOUT_ITEMS, playRhythm } from '../../../assets/pitches';
import { TYPE } from '../../../views/pages/Workout/commons';

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

export const playAudioBuffer = (
  pitchStr: string,
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
) => {
  const item = Object.values(CHIN_SAN_VOICES).find(
    (item) => item.pitchStr === pitchStr
  );
  const schedules: Schedule[] = item?.schedules || [];
  playScheduledItem(schedules, audioBuffer, audioContext);
};

export const playScheduledItem = async (
  schedules: Schedule[],
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
) => {
  const sourceNodes: AudioBufferSourceNode[] = [];

  schedules.map(async (_) => {
    const sourceNode = createSourceNode(audioBuffer, audioContext);
    sourceNodes.push(sourceNode);
  });

  const currentTime = audioContext.currentTime;
  schedules.forEach((item, index) => {
    const sourceNode = sourceNodes[index];
    sourceNode.start(currentTime + item.offset, item.start);
    sourceNode.stop(currentTime + item.offset + item.stop - item.start);
  });
};
