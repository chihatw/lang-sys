// import { CHIN_SAN_VOICES } from '../assets/chinSanVoices';
// import { playKana } from '../assets/kanas';
// import { playRhythm, PITCH_WORKOUT_ITEMS } from '../assets/pitches';
// import { PITCH_INPUT_ITEMS } from '../assets/pitchInputItems';
// import { Schedule } from '../Model';
// import { TYPE } from '../views/pages/Workout/commons';

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

// export const blobToAudioBuffer = async (
//   blob: Blob,
//   audioContext: AudioContext
// ) => {
//   const arrayBuffer = await blob.arrayBuffer();
//   const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
//   return audioBuffer;
// };

// export const createSourceNode = (
//   audioBuffer: AudioBuffer,
//   audioContext: AudioContext
// ) => {
//   const sourceNode = audioContext.createBufferSource();
//   sourceNode.buffer = audioBuffer;
//   sourceNode.connect(audioContext.destination);
//   return sourceNode;
// };

// export const createAudioContext = () => {
//   const audioContext = new window.AudioContext();
//   const osc = audioContext.createOscillator();
//   const gainNode = audioContext.createGain();

//   osc.connect(gainNode);
//   gainNode.connect(audioContext.destination);

//   gainNode.gain.value = 0;
//   osc.start(audioContext.currentTime);
//   osc.stop(audioContext.currentTime + 0.01);
//   return audioContext;
// };

// export const playAudioBuffer = (
//   type: string,
//   cueId: string,
//   audioBuffer: AudioBuffer,
//   audioContext: AudioContext
// ) => {
//   let schedules: Schedule[] = [];
//   switch (type) {
//     case TYPE.kana:
//       playKana(cueId, audioBuffer, audioContext);
//       break;
//     case TYPE.rhythm:
//       playRhythm(cueId, audioBuffer, audioContext);
//       break;
//     case TYPE.pitch:
//       const cue = PITCH_WORKOUT_ITEMS[cueId];
//       playScheduledItem(cue.schedules, audioBuffer, audioContext);
//       break;
//     case TYPE.pitchInput:
//       schedules = getSchedules(cueId, PITCH_INPUT_ITEMS);
//       playScheduledItem(schedules, audioBuffer, audioContext);
//       break;
//     case TYPE.record:
//       schedules = getSchedules(cueId, CHIN_SAN_VOICES);
//       console.log(schedules);
//       playScheduledItem(schedules, audioBuffer, audioContext);
//       break;
//     default:
//       console.error(`incorrect type: ${type}`);
//   }
// };

// export const playScheduledItem = async (
//   schedules: Schedule[],
//   audioBuffer: AudioBuffer,
//   audioContext: AudioContext
// ) => {
//   const sourceNodes: AudioBufferSourceNode[] = [];

//   schedules.map(async (_) => {
//     const sourceNode = createSourceNode(audioBuffer, audioContext);
//     sourceNodes.push(sourceNode);
//   });

//   const currentTime = audioContext.currentTime;
//   schedules.forEach((item, index) => {
//     const sourceNode = sourceNodes[index];
//     sourceNode.start(currentTime + item.offset, item.start);
//     sourceNode.stop(currentTime + item.offset + item.stop - item.start);
//   });
// };

// const getSchedules = (
//   pitchStr: string,
//   items: {
//     [key: string]: {
//       pitchStr: string;
//       schedules: Schedule[];
//     };
//   }
// ) => {
//   const item = Object.values(items).find((item) => item.pitchStr === pitchStr);
//   if (!item) return [];
//   return item.schedules;
// };
