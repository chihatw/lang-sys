export const shuffle = ([...array]: string[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const buildWordPitchStrs = (pitchStr: string) => {
  // 全角スペース(u3000)は半角スペース(u0020)に変換する
  pitchStr = pitchStr.replace(/\u3000/g, '\u0020');

  return pitchStr ? pitchStr.split('\u0020') : [];
};
