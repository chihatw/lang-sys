const YOUONS = 'ゃゅょャュョぁぃぅぇぉァィゥェォ'.split('');

export const getMorasWithPitchMark = (kanaStr: string) => {
  const moras: string[] = [];
  let totalYouons = 0;
  kanaStr.split('').forEach((char, index) => {
    if (!YOUONS.includes(char)) {
      moras.push(char);
    } else {
      totalYouons++;
      moras[index - totalYouons] = moras[index - totalYouons] + char;
    }
  });
  return moras;
};
