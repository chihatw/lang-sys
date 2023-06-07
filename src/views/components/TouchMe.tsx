import React from 'react';

const TouchMe = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 120px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 900,
        fontFamily: 'Roboto, sans-serif',
        fontSize: 60,
        color: 'rgba(0,0,0,0.15)',
      }}
    >
      touch me!!
    </div>
  );
};

export default TouchMe;
