import { memo } from 'react';
import { green, height, highPos, lowPos, width } from './constants';

const Line = memo(
  ({
    wordPitchLevels,
    showOdakaLine,
  }: {
    wordPitchLevels: boolean[];
    showOdakaLine: boolean;
  }) => {
    const svgWidth = (wordPitchLevels.length + (showOdakaLine ? 1 : 0)) * width;
    const points: number[] = [];
    wordPitchLevels.forEach((pitch, index) => {
      points.push(width / 2 + index * width);
      points.push(pitch ? highPos : lowPos);
    });
    const lastXPos = width / 2 + (wordPitchLevels.length - 1) * width;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          height,
          width: svgWidth,
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={svgWidth}
          height={height}
          viewBox={`0 0 ${svgWidth} ${height}`}
        >
          <polyline
            fill='none'
            stroke={green}
            strokeWidth={2}
            points={points.join(',')}
          />
          {showOdakaLine && (
            <polyline
              fill='none'
              stroke={green}
              strokeWidth='3'
              strokeDasharray='2 2'
              strokeDashoffset='1'
              points={[lastXPos, highPos, lastXPos + width, lowPos].join(',')}
            />
          )}
        </svg>
      </div>
    );
  }
);

export default Line;
