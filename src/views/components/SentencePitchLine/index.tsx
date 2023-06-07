import { useEffect, useState } from 'react';
import PitchLine from '../PitchLine';
import string2PitchesArray from 'string2pitches-array';

const SentencePitchLine = ({
  pitchStr,
  hasBorders,
}: {
  pitchStr: string;
  hasBorders?: boolean;
}) => {
  let totalMoras = 0;

  const [pitchesArray, setPitchesArray] = useState<string[][][]>([]);

  useEffect(() => {
    const pitchesArray: string[][][] = string2PitchesArray(pitchStr);
    setPitchesArray(pitchesArray);
  }, [pitchStr]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {pitchesArray.map((pitches, index) => {
        const _totalMoras = totalMoras;
        // pitches が [['']] の時、totalMoras をリセット
        if (pitches.length === 1 && !pitches[0][0]) {
          totalMoras = 0;
        } else {
          totalMoras += pitches.length;
        }
        return (
          <div key={index}>
            <PitchLine
              pitches={pitches}
              hasBorders={hasBorders}
              isOddStart={!!(_totalMoras % 2)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SentencePitchLine;
