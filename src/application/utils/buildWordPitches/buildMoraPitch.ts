export const buildMoraPitch = (
  mora: string,
  index: number,
  pitchPoint: number
) => {
  switch (pitchPoint) {
    // 平板型
    case 0:
      return index !== 0 ? [mora, 'h'] : [mora];
    // 頭高型
    case 1:
      return index === 0 ? [mora, 'h'] : [mora];
    // それ以外
    default:
      if (index === 0) {
        return [mora];
      } else {
        return index < pitchPoint ? [mora, 'h'] : [mora];
      }
  }
};
