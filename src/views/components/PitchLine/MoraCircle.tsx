import React from 'react';
import { green, height, width } from './constants';

const MoraCircle: React.FC<{ isHigh: boolean; isMute?: boolean }> = ({
  isHigh,
  isMute,
}) => {
  return (
    <div style={{ boxSizing: 'content-box', width, height }}>
      <div style={{ boxSizing: 'content-box', height: isHigh ? 4 : 13 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            boxSizing: 'content-box',
            width: 4,
            height: 4,
            border: `2px solid ${isMute ? 'lightgrey' : green}`,
            zIndex: 2,
            background: 'white',
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
};

export default MoraCircle;
