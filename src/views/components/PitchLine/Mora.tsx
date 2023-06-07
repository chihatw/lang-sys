import MoraCircle from './MoraCircle';
import MoraString from './MoraString';

const Mora: React.FC<{
  mora: string;
  index: number;
  isLast?: boolean;
  isMute?: boolean;
  showOdakaLine: boolean;
  hasBorder?: boolean;
  nextPitch?: boolean;
  isOddStart?: boolean;
  currentPitch: boolean;
}> = ({
  mora,
  index,
  isLast,
  isMute,
  showOdakaLine,
  hasBorder,
  nextPitch,
  isOddStart,
  currentPitch,
}) => {
  const isAccentCore =
    (isLast && showOdakaLine) ||
    (!isLast && currentPitch === true && nextPitch === false);
  const _isMute = isMute || ['っ', 'ッ'].includes(mora);
  const _hasBorder = hasBorder && index % 2 !== (isOddStart ? 1 : 0) && !isLast;
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 15,
          zIndex: -1,
          height: 40,
          marginLeft: -1,
          borderRight: `1px dashed ${_hasBorder ? 'grey' : 'transparent'}`,
        }}
      />
      <MoraCircle isHigh={currentPitch === true} isMute={_isMute} />
      <MoraString label={mora} isAccentCore={isAccentCore} />
    </div>
  );
};

export default Mora;
