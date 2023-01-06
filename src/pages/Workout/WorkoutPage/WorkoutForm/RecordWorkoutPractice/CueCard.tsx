import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';

const CueCard = ({
  height,
  pitchArray,
}: {
  height: number;
  pitchArray: string[][][];
}) => {
  return (
    <div
      style={{
        display: 'flex',
        height,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SentencePitchLine pitchesArray={pitchArray} />
    </div>
  );
};

export default CueCard;
