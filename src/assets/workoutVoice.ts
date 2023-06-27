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
    japanese: '服を洗います',
    chinese: '洗衣服',
    pitchStr: 'ふく＼を　あらいま＼す',
    start: 0.6,
    stop: 3.1,
  },
  sample2: {
    japanese: '服を洗いません',
    chinese: '不洗衣服',
    pitchStr: 'ふく＼を　あらいませ＼ん',
    start: 3.8,
    stop: 6.3,
  },
  sample3: {
    japanese: '服を洗いました',
    chinese: '當時有洗衣服',
    pitchStr: 'ふく＼を　あらいま＼した',
    start: 7.2,
    stop: 9.5,
  },
  sample4: {
    japanese: '服を洗いませんでした',
    chinese: '當時沒有洗衣服',
    pitchStr: 'ふく＼を　あらいませ＼んでした',
    start: 10.3,
    stop: 13.4,
  },
  sample5: {
    japanese: '服を洗うこと',
    chinese: '洗衣服這件事',
    pitchStr: 'ふく＼を　あらう　こと',
    start: 14.0,
    stop: 17.1,
  },
  sample6: {
    japanese: '服を洗わないこと',
    chinese: '不洗衣服這件事',
    pitchStr: 'ふく＼を　あらわない　こと',
    start: 17.9,
    stop: 21.5,
  },
  sample7: {
    japanese: '服を洗ったこと',
    chinese: '當時有洗衣服這件事',
    pitchStr: 'ふく＼を　あらった　こと',
    start: 22.3,
    stop: 25.3,
  },
  sample8: {
    japanese: '服を洗わなかったこと',
    chinese: '當時沒有洗衣服這件事',
    pitchStr: 'ふく＼を　あらわな＼かった　こと',
    start: 25.8,
    stop: 30.1,
  },
};
