interface ISchedule {
  offset: number;
  start: number;
  stop: number;
}

export const PITCH_INPUT_ITEMS: {
  [key: string]: { pitchStr: string; schedules: ISchedule[] };
} = {
  // 2拍 - 6
  tata0: {
    pitchStr: 'タタ',
    schedules: [{ offset: 0, start: 0.7, stop: 1.5 }],
  },
  tata1: {
    pitchStr: 'タ＼タ',
    schedules: [{ offset: 0, start: 2.0, stop: 2.8 }],
  },
  taa0: {
    pitchStr: 'ター',
    schedules: [{ offset: 0, start: 3.3, stop: 4.1 }],
  },
  taa1: {
    pitchStr: 'タ＼ー',
    schedules: [{ offset: 0, start: 4.6, stop: 5.4 }],
  },
  tan0: {
    pitchStr: 'タン',
    schedules: [{ offset: 0, start: 6.0, stop: 6.8 }],
  },
  tan1: {
    pitchStr: 'タ＼ン',
    schedules: [{ offset: 0, start: 7.4, stop: 8.2 }],
  },
  // 3拍 - 15
  // タタタ
  tatata0: {
    pitchStr: 'タタタ',
    schedules: [{ offset: 0, start: 8.7, stop: 9.8 }],
  },
  tatata1: {
    pitchStr: 'タ＼タタ',
    schedules: [{ offset: 0, start: 10.3, stop: 11.4 }],
  },
  tatata2: {
    pitchStr: 'タタ＼タ',
    schedules: [{ offset: 0, start: 11.9, stop: 13.0 }],
  },
  // タータ
  taata0: {
    pitchStr: 'タータ',
    schedules: [{ offset: 0, start: 13.5, stop: 14.6 }],
  },
  taata1: {
    pitchStr: 'タ＼ータ',
    schedules: [{ offset: 0, start: 15.2, stop: 16.3 }],
  },
  // タター
  tataa0: {
    pitchStr: 'タター',
    schedules: [{ offset: 0, start: 16.8, stop: 17.9 }],
  },
  tataa1: {
    pitchStr: 'タ＼ター',
    schedules: [{ offset: 0, start: 18.5, stop: 19.6 }],
  },
  tataa2: {
    pitchStr: 'タタ＼ー',
    schedules: [{ offset: 0, start: 20.1, stop: 21.2 }],
  },
  // タンタ
  tanta0: {
    pitchStr: 'タンタ',
    schedules: [{ offset: 0, start: 21.7, stop: 22.8 }],
  },
  tanta1: {
    pitchStr: 'タ＼ンタ',
    schedules: [{ offset: 0, start: 23.3, stop: 24.4 }],
  },
  // タタン
  tatan0: {
    pitchStr: 'タタン',
    schedules: [{ offset: 0, start: 24.9, stop: 26.0 }],
  },
  tatan1: {
    pitchStr: 'タ＼タン',
    schedules: [{ offset: 0, start: 26.5, stop: 27.6 }],
  },
  tatan2: {
    pitchStr: 'タタ＼ン',
    schedules: [{ offset: 0, start: 28.1, stop: 29.2 }],
  },
  // タッタ
  tatta0: {
    pitchStr: 'タッタ',
    schedules: [{ offset: 0, start: 29.7, stop: 30.8 }],
  },
  tatta1: {
    pitchStr: 'タ＼ッタ',
    schedules: [{ offset: 0, start: 31.3, stop: 32.4 }],
  },
  // 4拍 - 30
  // タタタタ
  tatatata0: {
    pitchStr: 'タタタタ',
    schedules: [{ offset: 0, start: 33.0, stop: 34.4 }],
  },
  tatatata1: {
    pitchStr: 'タ＼タタタ',
    schedules: [{ offset: 0, start: 34.9, stop: 36.3 }],
  },
  tatatata2: {
    pitchStr: 'タタ＼タタ',
    schedules: [{ offset: 0, start: 37, stop: 38.4 }],
  },
  tatatata3: {
    pitchStr: 'タタタ＼タ',
    schedules: [{ offset: 0, start: 38.8, stop: 40.2 }],
  },
  // タータタ
  taatata0: {
    pitchStr: 'タータタ',
    schedules: [{ offset: 0, start: 40.8, stop: 42.2 }],
  },
  taatata1: {
    pitchStr: 'タ＼ータタ',
    schedules: [{ offset: 0, start: 42.7, stop: 44.1 }],
  },
  taatata3: {
    pitchStr: 'タータ＼タ',
    schedules: [{ offset: 0, start: 44.5, stop: 45.9 }],
  },
  // タタータ
  tataata0: {
    pitchStr: 'タタータ',
    schedules: [{ offset: 0, start: 46.5, stop: 47.9 }],
  },
  tataata1: {
    pitchStr: 'タ＼タータ',
    schedules: [{ offset: 0, start: 48.4, stop: 49.8 }],
  },
  tataata2: {
    pitchStr: 'タタ＼ータ',
    schedules: [{ offset: 0, start: 50.3, stop: 51.7 }],
  },
  // タタター
  tatataa0: {
    pitchStr: 'タタター',
    schedules: [{ offset: 0, start: 52.4, stop: 53.8 }],
  },
  tatataa1: {
    pitchStr: 'タ＼タター',
    schedules: [{ offset: 0, start: 54.1, stop: 55.5 }],
  },
  tatataa2: {
    pitchStr: 'タタ＼ター',
    schedules: [{ offset: 0, start: 56.0, stop: 57.4 }],
  },
  tatataa3: {
    pitchStr: 'タタタ＼ー',
    schedules: [{ offset: 0, start: 58.1, stop: 59.5 }],
  },
  // タンタタ
  tantata0: {
    pitchStr: 'タンタタ',
    schedules: [{ offset: 0, start: 60, stop: 61.4 }],
  },
  tantata1: {
    pitchStr: 'タ＼ンタタ',
    schedules: [{ offset: 0, start: 61.6, stop: 63.0 }],
  },
  tantata3: {
    pitchStr: 'タンタ＼タ',
    schedules: [{ offset: 0, start: 63.5, stop: 64.9 }],
  },
  // タタンタ
  tatanta0: {
    pitchStr: 'タタンタ',
    schedules: [{ offset: 0, start: 65.4, stop: 66.8 }],
  },
  tatanta1: {
    pitchStr: 'タ＼タンタ',
    schedules: [{ offset: 0, start: 67.4, stop: 68.8 }],
  },
  tatanta2: {
    pitchStr: 'タタ＼ンタ',
    schedules: [{ offset: 0, start: 69.2, stop: 70.6 }],
  },
  // タタタン
  tatatan0: {
    pitchStr: 'タタタン',
    schedules: [{ offset: 0, start: 71.0, stop: 72.4 }],
  },
  tatatan1: {
    pitchStr: 'タ＼タタン',
    schedules: [{ offset: 0, start: 72.8, stop: 74.2 }],
  },
  tatatan2: {
    pitchStr: 'タタ＼タン',
    schedules: [{ offset: 0, start: 74.6, stop: 76.0 }],
  },
  tatatan3: {
    pitchStr: 'タタタ＼ン',
    schedules: [{ offset: 0, start: 76.5, stop: 77.9 }],
  },
  // タッタタ
  tattata0: {
    pitchStr: 'タッタタ',
    schedules: [{ offset: 0, start: 78.4, stop: 79.8 }],
  },
  tattata1: {
    pitchStr: 'タ＼ッタタ',
    schedules: [{ offset: 0, start: 80.3, stop: 81.7 }],
  },
  tattata2: {
    pitchStr: 'タッタ＼タ',
    schedules: [{ offset: 0, start: 82.3, stop: 83.7 }],
  },
  // タタッタ
  tatatta0: {
    pitchStr: 'タタッタ',
    schedules: [{ offset: 0, start: 84.2, stop: 85.6 }],
  },
  tatatta1: {
    pitchStr: 'タ＼タッタ',
    schedules: [{ offset: 0, start: 86.1, stop: 87.5 }],
  },
  tatatta2: {
    pitchStr: 'タタ＼ッタ',
    schedules: [{ offset: 0, start: 88.1, stop: 89.5 }],
  },
};
