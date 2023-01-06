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
};
