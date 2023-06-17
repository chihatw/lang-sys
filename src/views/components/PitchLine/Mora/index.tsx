import { memo } from 'react';
import MoraCircle from './MoraCircle';

const Mora = memo(
  ({
    mora,
    isMute,
    pitchLevel,
    isAccentCore,
  }: {
    mora: string;
    pitchLevel: boolean;
    isAccentCore: boolean;
    isMute?: boolean;
  }) => {
    const _isMute = isMute || ['っ', 'ッ'].includes(mora);
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 15,
            zIndex: -1,
            height: 40,
            marginLeft: -1,
          }}
        />
        <MoraCircle isHigh={pitchLevel} isMute={_isMute} />
        <div
          style={{
            width: 15,
            height: 20,
            display: 'flex',
            boxSizing: 'border-box',
            alignItems: 'center',
            paddingTop: 1,
            paddingLeft: 1,
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              color: isAccentCore ? 'red' : 'inherit',
              fontSize: 11,
              textAlign: 'center',
              transform: 'scaleX(0.8)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              marginLeft: -1,
              letterSpacing: -2,
              transformOrigin: 'left',
            }}
          >
            {mora}
          </div>
        </div>
      </div>
    );
  }
);

export default Mora;
