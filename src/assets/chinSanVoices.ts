import { Schedule } from '../Model';

export const CHIN_SAN_VOICES: {
  [id: string]: {
    pitchStr: string;
    schedules: Schedule[];
  };
} = {
  tatata0: {
    pitchStr: 'タタタ',
    schedules: [{ offset: 0, start: 0.7, stop: 2.0 }],
  },
  tatata1: {
    pitchStr: 'タ＼タタ',
    schedules: [{ offset: 0, start: 2.5, stop: 3.9 }],
  },
  tatata2: {
    pitchStr: 'タタ＼タ',
    schedules: [{ offset: 0, start: 4.5, stop: 5.8 }],
  },
  tanta1: {
    pitchStr: 'タ＼ンタ',
    schedules: [{ offset: 0, start: 6.7, stop: 7.6 }],
  },
  tanta0: {
    pitchStr: 'タンタ',
    schedules: [{ offset: 0, start: 8.2, stop: 9.2 }],
  },
  taata1: {
    pitchStr: 'タ＼ータ',
    schedules: [{ offset: 0, start: 9.9, stop: 10.9 }],
  },
  taata0: {
    pitchStr: 'タータ',
    schedules: [{ offset: 0, start: 11.6, stop: 12.7 }],
  },
  tatta1: {
    pitchStr: 'タ＼ッタ',
    schedules: [{ offset: 0, start: 13.2, stop: 14.1 }],
  },
  tatta0: {
    pitchStr: 'タッタ',
    schedules: [{ offset: 0, start: 14.7, stop: 15.7 }],
  },
  tatan0: {
    pitchStr: 'タタン',
    schedules: [{ offset: 0, start: 16.7, stop: 18.2 }],
  },
  tatan1: {
    pitchStr: 'タ＼タン',
    schedules: [{ offset: 0, start: 18.7, stop: 20.3 }],
  },
  tatan2: {
    pitchStr: 'タタ＼ン',
    schedules: [{ offset: 0, start: 21.0, stop: 22.5 }],
  },
  tataa0: {
    pitchStr: 'タター',
    schedules: [{ offset: 0, start: 23.2, stop: 24.6 }],
  },
  tataa1: {
    pitchStr: 'タ＼ター',
    schedules: [{ offset: 0, start: 27.7, stop: 29.0 }],
  },
  tatatata0: {
    pitchStr: 'タタタタ',
    schedules: [{ offset: 0, start: 29.7, stop: 31.6 }],
  },
  tatatata1: {
    pitchStr: 'タ＼タタタ',
    schedules: [{ offset: 0, start: 32.1, stop: 33.9 }],
  },
  tatatata2: {
    pitchStr: 'タタ＼タタ',
    schedules: [{ offset: 0, start: 34.3, stop: 36.2 }],
  },
  tatatata3: {
    pitchStr: 'タタタ＼タ',
    schedules: [{ offset: 0, start: 36.7, stop: 38.7 }],
  },
  taaatata0: {
    pitchStr: 'タータタ',
    schedules: [{ offset: 0, start: 39.3, stop: 41.3 }],
  },
  taaatata1: {
    pitchStr: 'タ＼ータタ',
    schedules: [{ offset: 0, start: 41.7, stop: 43.4 }],
  },
  taaatata3: {
    pitchStr: 'タータ＼タ',
    schedules: [{ offset: 0, start: 44.1, stop: 45.9 }],
  },
  tataata0: {
    pitchStr: 'タタータ',
    schedules: [{ offset: 0, start: 46.6, stop: 48.4 }],
  },
  tataata1: {
    pitchStr: 'タ＼タータ',
    schedules: [{ offset: 0, start: 49.2, stop: 50.9 }],
  },
  tataata2: {
    pitchStr: 'タタ＼ータ',
    schedules: [{ offset: 0, start: 51.7, stop: 53.4 }],
  },
};
