import { createSourceNode } from '../application/audio/core/2-services';

import { CHIN_SAN_VOICES } from './chinSanVoices';
import { PITCH_INPUT_ITEMS } from './pitchInputItems';

interface ISchedule {
  offset: number;
  start: number;
  stop: number;
}

const TYPE = {
  kana: 'kana',
  pitch: 'pitch',
  rhythm: 'rhythm',
  record: 'record',
  pitchInput: 'pitchInput',
  chineseCue: 'chineseCue',
};

type PitchCue = {
  id: string;
  end: number;
  start: number;
  pitchStr: string;
};

export const PITCHES: { [id: string]: PitchCue } = {
  ta: { id: 'ta', start: 0.6, end: 1.3, pitchStr: 'タ＼ッ' },
  taa: { id: 'taa', start: 1.8, end: 2.7, pitchStr: 'タ＼ー' },
  tan: { id: 'tan', start: 3.1, end: 3.7, pitchStr: 'タ＼ン' },
  tata: { id: 'tata', start: 4.4, end: 5.2, pitchStr: 'タ＼タ' },
  tatta: { id: 'tatta', start: 5.4, end: 6.5, pitchStr: 'タ＼ッタ' },
  taata: { id: 'taata', start: 7.0, end: 7.9, pitchStr: 'タ＼ータ' },
  tanta: { id: 'tanta', start: 8.6, end: 9.4, pitchStr: 'タ＼ンタ' },
  tatata: {
    id: 'tatata',
    start: 10.0,
    end: 10.9,
    pitchStr: 'タ＼タタ',
  },
  tatax: { id: 'tatax', start: 4.4, end: 5.2, pitchStr: 'タ＼タッ' },
  tataa: {
    id: 'tataa',
    start: 11.5,
    end: 12.4,
    pitchStr: 'タ＼ター',
  },
  tatan: {
    id: 'tatan',
    start: 13.1,
    end: 13.9,
    pitchStr: 'タ＼タン',
  },
  tattata: {
    id: 'tattata',
    start: 14.5,
    end: 15.6,
    pitchStr: 'タ＼ッタタ',
  },
  taatata: {
    id: 'taatata',
    start: 16.3,
    end: 17.2,
    pitchStr: 'タ＼ータタ',
  },
  tantata: {
    id: 'tantata',
    start: 18.1,
    end: 19.1,
    pitchStr: 'タ＼ンタタ',
  },
  tatatata: { id: 'tatatata', start: 19.8, end: 21.1, pitchStr: 'タ＼タタタ' },
  tatatta: {
    id: 'tatatta',
    start: 21.6,
    end: 22.7,
    pitchStr: 'タ＼タッタ',
  },
  tataata: {
    id: 'tataata',
    start: 23.3,
    end: 24.5,
    pitchStr: 'タ＼タータ',
  },
  tatanta: {
    id: 'tatanta',
    start: 25.1,
    end: 26.2,
    pitchStr: 'タ＼タンタ',
  },
  tatatax: {
    id: 'tatatax',
    start: 10,
    end: 10.9,
    pitchStr: 'タ＼タタッ',
  },
  tatataa: {
    id: 'tatataa',
    start: 26.9,
    end: 28,
    pitchStr: 'タ＼タター',
  },
  tatatan: {
    id: 'tatatan',
    start: 28.7,
    end: 29.8,
    pitchStr: 'タ＼タタン',
  },
  tattaa: {
    id: 'tattaa',
    start: 30.5,
    end: 31.6,
    pitchStr: 'タ＼ッター',
  },
  tattan: {
    id: 'tattan',
    start: 32.3,
    end: 33.4,
    pitchStr: 'タ＼ッタン',
  },
  taataa: {
    id: 'taataa',
    start: 34.0,
    end: 35.1,
    pitchStr: 'タ＼ーター',
  },
  taatan: {
    id: 'taatan',
    start: 35.8,
    end: 36.9,
    pitchStr: 'タ＼ータン',
  },
  tantaa: {
    id: 'tantaa',
    start: 37.5,
    end: 38.7,
    pitchStr: 'タ＼ンター',
  },
  tantan: {
    id: 'tantan',
    start: 39.3,
    end: 40.3,
    pitchStr: 'タ＼ンタン',
  },
};

export const playRhythm = async (cueId: string, audioBuffer: AudioBuffer) => {
  const cue = PITCHES[cueId];
  const sourceNode = createSourceNode(audioBuffer);
  sourceNode.start(0, cue.start, cue.end - cue.start);
};

const GAP = {
  s: 0.05,
  m: 0.06,
  l: 0.12,
};

const GAPS: { [key: string]: number[] } = {
  hl: [GAP.l],
  lh: [GAP.l],
  hll: [GAP.l, GAP.m],
  lhl: [GAP.l, GAP.s],
  lhh: [GAP.l, GAP.s],
  hlll: [GAP.l, GAP.m, GAP.m],
  lhll: [GAP.l, GAP.s, GAP.s],
  lhhl: [GAP.l, GAP.s, GAP.s],
  lhhh: [GAP.l, GAP.s, GAP.s],
};

const START_AT: { [key: string]: number } = {
  h: 0.75,
  l: 1.26,
};
const DURATION: { [key: string]: number } = {
  h: 0.4,
  l: 0.35,
};

/**
 * input は低音をl, 高音をhで表す 'lhhh'
 */

const buildSchedules = (input: string): ISchedule[] => {
  const schedules: ISchedule[] = [];

  const pitches = input.split('');

  if (!pitches.every((char) => ['l', 'h'].includes(char))) {
    console.error('inputs only accepts "l" or "h" ');
    return [];
  }

  let offset = 0;

  pitches.forEach((pitch, index) => {
    const start = START_AT[pitch];
    const stop = offset + DURATION[pitch];
    const schedule = { offset, start, stop };
    schedules.push(schedule);
    offset = stop + GAPS[input][index];
  });

  return schedules;
};

export const PITCH_WORKOUT_ITEMS: {
  [key: string]: { id: string; pitchStr: string; schedules: ISchedule[] };
} = {
  hl: {
    id: 'hl',
    pitchStr: 'タ＼タ',
    schedules: buildSchedules('hl'),
  },
  lh: {
    id: 'lh',
    pitchStr: 'タタ',
    schedules: buildSchedules('lh'),
  },
  hll: {
    id: 'hll',
    pitchStr: 'タ＼タタ',
    schedules: buildSchedules('hll'),
  },
  lhl: {
    id: 'lhl',
    pitchStr: 'タタ＼タ',
    schedules: buildSchedules('lhl'),
  },
  lhh: {
    id: 'lhh',
    pitchStr: 'タタタ',
    schedules: buildSchedules('lhh'),
  },
  hlll: {
    id: 'hlll',
    pitchStr: 'タ＼タタタ',
    schedules: buildSchedules('hlll'),
  },
  lhll: {
    id: 'lhll',
    pitchStr: 'タタ＼タタ',
    schedules: buildSchedules('lhll'),
  },
  lhhl: {
    id: 'lhhl',
    pitchStr: 'タタタ＼タ',
    schedules: buildSchedules('lhhl'),
  },
  lhhh: {
    id: 'lhhh',
    pitchStr: 'タタタタ',
    schedules: buildSchedules('lhhh'),
  },
};

export const buildPitchCues = (type: string, cueIds: string[]) => {
  let pitchCues: {
    id: string;
    pitchStr: string;
  }[] = [];

  if (!cueIds.length) return pitchCues;
  switch (type) {
    case TYPE.pitchInput:
      pitchCues = Object.values(PITCH_INPUT_ITEMS)
        .filter((item) => cueIds.includes(item.pitchStr))
        // id に pitchStr を設定
        .map(({ pitchStr }) => ({ id: pitchStr, pitchStr }));
      return pitchCues;

    case TYPE.record:
      pitchCues = cueIds
        .map((cueId) => {
          const item = Object.values(CHIN_SAN_VOICES).find(
            (voice) => voice.pitchStr === cueId
          );
          if (!item) return { id: '', pitchStr: '' };
          return { id: item.pitchStr, pitchStr: item.pitchStr };
        })
        .filter((i) => !!i.id);

      return pitchCues;

    case TYPE.pitch:
      pitchCues = Object.values(PITCH_WORKOUT_ITEMS)
        .filter((item) => cueIds.includes(item.id))
        // id が元々 pitchStr なので、そのまま利用
        .map(({ id, pitchStr }) => ({ id, pitchStr }));
      return pitchCues;

    case TYPE.rhythm:
      pitchCues = Object.values(PITCHES)
        .filter((item) => cueIds.includes(item.id))
        // id が元々 pitchStr なので、そのまま利用
        .map(({ id, pitchStr }) => ({ id, pitchStr }));
      return pitchCues;

    default:
      console.error(`incorrect type: ${type}`);
      return [];
  }
};
