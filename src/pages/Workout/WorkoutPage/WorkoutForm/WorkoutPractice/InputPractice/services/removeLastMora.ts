export const removeLastMora = (input: string) => {
  // 「タ＼」 → 「」
  if (input === 'タ＼') return '';

  const nextLastPitch = input.slice(-2, -1);
  // 「タ＼タ」(length: 3) → 「タ＼」
  // 「タタ＼タ」(length: 4) → 「タタ」
  const isDeleteAccent = nextLastPitch === '＼' && input.length > 3;
  return input.slice(0, isDeleteAccent ? -2 : -1);
};
