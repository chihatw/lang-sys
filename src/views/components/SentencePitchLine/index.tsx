import { memo, useMemo } from 'react';
import PitchLine from '../PitchLine';
import { buildWordPitchStrs } from 'application/utils/utils';

const SentencePitchLine = memo(({ pitchStr }: { pitchStr: string }) => {
  const wordPitchStrs = useMemo(() => buildWordPitchStrs(pitchStr), [pitchStr]);

  const renderedWordPitchLines = wordPitchStrs.map((wordPitchStr, index) => (
    <PitchLine key={index} wordPitchStr={wordPitchStr} />
  ));
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {renderedWordPitchLines}
    </div>
  );
});

export default SentencePitchLine;
