import Line from './Line';
import Mora from './Mora';

type PitchLineProps = {
  /**
   * 高ピッチは ["あ","h"]、低ピッチは ["あ"]、尾高は最後に [""]追加、['m']はミュート、空文字のみも許可
   */
  pitches: string[][];
  /**
   * リズムの境界線を表示
   */
  hasBorders?: boolean;
  /**
   * 1拍から開始
   */
  isOddStart?: boolean;
  /**
   * 既定値は0
   */
  paddingBottom?: number;
};

const PitchLine = ({
  pitches,
  hasBorders,
  isOddStart,
  paddingBottom,
}: PitchLineProps) => {
  // 空の場合
  const isEmpty = !pitches[0] || pitches[0][0] === '';
  if (isEmpty) return <div style={{ height: 40, width: 15 }} />;

  // ミュートの場合
  const isMute = pitches[0][0] === 'm';
  if (isMute)
    return (
      <Mora
        mora={''}
        index={0}
        isMute
        currentPitch={false}
        showOdakaLine={false}
      />
    );

  const pitchArray = pitches.map((i) => i[1] === 'h'); // 低音：false, 高音：true
  const showOdakaLine =
    // pitchesの最後から二つ目が高ピッチ
    !!pitches.slice(-2, -1)[0] &&
    !!pitches.slice(-2, -1)[0][1] &&
    // pitchesの最後が空文字列
    pitches.slice(-1)[0][0] === '';

  const moraArray = pitches.map((i) => i[0]);

  // 尾高の場合、最後の[""]を取り除く
  if (!!pitches && showOdakaLine) {
    pitchArray.pop();
    moraArray.pop();
  }

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: paddingBottom || 0,
      }}
    >
      <Line showOdakaLine={showOdakaLine} pitchArray={pitchArray} />
      <div style={{ display: 'flex' }}>
        {moraArray.map((mora, index) => {
          const isLast = index === moraArray.length - 1;
          return (
            <Mora
              key={index}
              mora={mora}
              index={index}
              isLast={isLast}
              hasBorder={hasBorders}
              isOddStart={isOddStart}
              showOdakaLine={showOdakaLine}
              currentPitch={pitchArray[index]}
              nextPitch={!isLast ? pitchArray[index + 1] : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PitchLine;
