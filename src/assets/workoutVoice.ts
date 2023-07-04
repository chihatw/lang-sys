export const WORKOUT_VOICES: {
  [id: string]: {
    pitchStr: string;
    japanese: string;
    chinese: string;
    start: number;
    stop: number;
  };
} = {
  sample1: {
    japanese: '本を探します',
    chinese: '找書',
    pitchStr: 'ほ＼んを　さがしま＼す',
    start: 0.6,
    stop: 3.2,
  },
  sample2: {
    japanese: '本を探しません',
    chinese: '不找書',
    pitchStr: 'ほ＼んを　さがしませ＼ん',
    start: 3.9,
    stop: 6.2,
  },
  sample3: {
    japanese: '本を探しました',
    chinese: '當時有找書',
    pitchStr: 'ほ＼んを　さがしま＼した',
    start: 6.7,
    stop: 9.1,
  },
  sample4: {
    japanese: '本を探しませんでした',
    chinese: '當時沒有找書',
    pitchStr: 'ほ＼んを　さがしませ＼んでした',
    start: 9.6,
    stop: 12.6,
  },
  sample5: {
    japanese: '本を探すこと',
    chinese: '找書這件事',
    pitchStr: 'ほ＼んを　さがす　こと',
    start: 13.2,
    stop: 15.8,
  },
  sample6: {
    japanese: '本を探さないこと',
    chinese: '不找書這件事',
    pitchStr: 'ほ＼んを　さがさない　こと',
    start: 16.4,
    stop: 20.0,
  },
  sample7: {
    japanese: '本を探したこと',
    chinese: '當時有找書這件事',
    pitchStr: 'ほ＼んを　さがした　こと',
    start: 20.4,
    stop: 23.3,
  },
  sample8: {
    japanese: '本を探さなかったこと',
    chinese: '當時沒有找書這件事',
    pitchStr: 'ほ＼んを　さがさな＼かった　こと',
    start: 23.9,
    stop: 27.8,
  },
};
