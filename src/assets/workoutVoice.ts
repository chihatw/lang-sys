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
    japanese: 'ゴミを捨てます',
    pitchStr: 'ゴミ＼を　すてま＼す',
    chinese: '丟垃圾',
    start: 0.7,
    stop: 3.2,
  },
  sample2: {
    japanese: 'ゴミを捨てません',
    pitchStr: 'ゴミ＼を　すてませ＼ん',
    chinese: '不丟垃圾',
    start: 3.8,
    stop: 6.1,
  },
  sample3: {
    japanese: 'ゴミを捨てました',
    pitchStr: 'ゴミ＼を　すてま＼した',
    chinese: '當時有丟垃圾',
    start: 6.7,
    stop: 8.9,
  },
  sample4: {
    japanese: 'ゴミを捨てませんでした',
    pitchStr: 'ゴミ＼を　すてませ＼んでした',
    chinese: '當時沒有丟垃圾',
    start: 9.5,
    stop: 12.1,
  },
  sample5: {
    japanese: 'ゴミを捨てる行為',
    pitchStr: 'ゴミ＼を　すてる　こ＼ーい',
    chinese: '丟垃圾這個行為',
    start: 12.7,
    stop: 15.0,
  },
  sample6: {
    japanese: 'ゴミを捨てない行為',
    pitchStr: 'ゴミ＼を　すてない　こ＼ーい',
    chinese: '不丟垃圾這個行為',
    start: 15.6,
    stop: 18.0,
  },
  sample7: {
    japanese: 'ゴミを捨てた行為',
    pitchStr: 'ゴミ＼を　すてた　こ＼ーい',
    chinese: '當時有丟垃圾這個行為',
    start: 18.6,
    stop: 20.9,
  },
  sample8: {
    japanese: 'ゴミを捨てなかった行為',
    pitchStr: 'ゴミ＼を　すてな＼かった　こ＼ーい',
    chinese: '當時不丟垃圾這個行為',
    start: 21.5,
    stop: 24.2,
  },
};
