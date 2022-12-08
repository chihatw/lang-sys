import { playKana } from '../assets/kanas';
import { playPitch, playRhythm } from '../assets/pitches';
import { getSchedules, playScheduledItem } from '../assets/pitchInputItems';
import { TYPE } from '../pages/Workout/commons';

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const shuffle = ([...array]: string[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const blobToAudioBuffer = async (
  blob: Blob,
  audioContext: AudioContext
) => {
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
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

export const playAudioBuffer = (
  type: string,
  cueId: string,
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
) => {
  switch (type) {
    case TYPE.kana:
      playKana(cueId, audioBuffer, audioContext);
      break;
    case TYPE.rhythm:
      playRhythm(cueId, audioBuffer, audioContext);
      break;
    case TYPE.pitch:
      playPitch(cueId, audioBuffer, audioContext);
      break;
    case TYPE.pitchInput:
      const schedules = getSchedules(cueId);
      playScheduledItem(schedules, audioBuffer, audioContext);
      break;

    default:
  }
};
