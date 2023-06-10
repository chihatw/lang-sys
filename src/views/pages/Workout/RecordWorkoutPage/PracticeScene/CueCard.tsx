import SentencePitchLine from 'views/components/SentencePitchLine';

const CueCard = ({
  height,
  pitchStr,
}: {
  height: number;
  pitchStr: string;
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
      <SentencePitchLine pitchStr={pitchStr} />
    </div>
  );
};

export default CueCard;
