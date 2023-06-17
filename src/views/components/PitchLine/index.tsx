import { useMemo, memo } from 'react';

import Line from './Line';
import Mora from './Mora';

import { buildWordPitches } from 'application/utils/buildWordPitches';

const PitchLine = memo(({ wordPitchStr }: { wordPitchStr: string }) => {
  const wordPitches = useMemo(
    () => buildWordPitches(wordPitchStr),
    [wordPitchStr]
  );
  const wordPitchLevels = useMemo(
    () => wordPitches.map((i) => i[1] === 'h'),
    [wordPitches]
  ); // 低音：false, 高音：true

  // 空の場合
  if (!wordPitches[0] || wordPitches[0][0] === '')
    return <div style={{ height: 40, width: 15 }} />;

  // ミュートの場合
  if (wordPitches[0][0] === 'm')
    return <Mora mora={''} isMute pitchLevel={false} isAccentCore={false} />;

  const showOdakaLine =
    // pitchesの最後から二つ目が高ピッチ
    !!wordPitches.slice(-2, -1)[0] &&
    !!wordPitches.slice(-2, -1)[0][1] &&
    // pitchesの最後が空文字列
    wordPitches.slice(-1)[0][0] === '';

  const moras = wordPitches.map((i) => i[0]);

  // 尾高の場合、最後の[""]を取り除く
  if (!!wordPitches && showOdakaLine) {
    wordPitchLevels.pop();
    moras.pop();
  }

  const renderedMoras = moras.map((mora, index) => {
    const isLast = index === moras.length - 1;
    const currentPitchLevel = wordPitchLevels[index];
    const nextPitchLevel = !isLast ? wordPitchLevels[index + 1] : undefined;
    const isAccentCore =
      (isLast && showOdakaLine) ||
      (!isLast && currentPitchLevel === true && nextPitchLevel === false);
    return (
      <Mora
        key={index}
        mora={mora}
        pitchLevel={currentPitchLevel}
        isAccentCore={isAccentCore}
      />
    );
  });

  return (
    <div style={{ position: 'relative' }}>
      <Line showOdakaLine={showOdakaLine} wordPitchLevels={wordPitchLevels} />
      <div style={{ display: 'flex' }}>{renderedMoras}</div>
    </div>
  );
});

export default PitchLine;
