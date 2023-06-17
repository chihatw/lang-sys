import { buildMoraPitch } from './buildMoraPitch';
import { getMorasWithPitchMark } from './getMorasWithPitchMark';

export const buildWordPitches = (wordPitchStr: string) => {
  // アクセントの位置からピッチを計算
  const morasWithPitchMark = getMorasWithPitchMark(wordPitchStr);

  // 最後尾が「＼」かどうか
  const isOdaka = morasWithPitchMark.slice(-1)[0] === '\uff3c';

  // 「＼」の位置確認、ない場合は0
  const pitchPoint = Math.max(morasWithPitchMark.indexOf('\uff3c'), 0);

  // 「＼」の削除
  const moras = morasWithPitchMark.filter((m) => m !== '\uff3c');

  const wordPitches = moras.map((mora, index) =>
    buildMoraPitch(mora, index, pitchPoint)
  );

  if (isOdaka) wordPitches.push(['']);
  return wordPitches;
};
