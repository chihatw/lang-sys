export const buildInput = (
  input: string,
  clicked: string,
  pitch: string
): string => {
  const moraCount = input.replace('＼', '').length;
  const isHigh = pitch === 'high';
  const lastPitchIsHigh = !input.includes('＼') || input.slice(-1) === '＼';

  let _added = '';
  switch (moraCount) {
    /**
     * 1文字目
     * */
    case 0:
      //
      return clicked === 'タ'
        ? //「タ」がクリック
          isHigh
          ? 'タ＼'
          : 'タ'
        : //それ以外がクリック
          input;
    /**
     * 2文字目
     * */
    case 1:
      _added =
        input === 'タ＼'
          ? // 1文字目が高音の場合、
            isHigh
            ? // 2文字目も高音なら、追加しない
              ''
            : // 2文字目が低音なら、追加する
              clicked
          : // 1文字目が低音の場合、
          isHigh
          ? // 2文字目が高音なら、追加する
            clicked
          : // 2文字目が低音なら、追加しない
            '';

      return input + _added;

    /**
     * 3文字目以降
     */
    default:
      _added = lastPitchIsHigh
        ? // 直前が高音
          isHigh
          ? // 高 →　高
            clicked
          : // 高 →　低
            '＼' + clicked
        : // 直前が低音
        isHigh
        ? // 高低 ＋ 高　は不可
          ''
        : // 高低 ＋ 低　は可
          clicked;

      return input + _added;
  }
};
