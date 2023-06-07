import React from 'react';

const MoraString: React.FC<{
  label: string;
  isAccentCore: boolean;
}> = ({ label, isAccentCore }) => {
  return (
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
        {label}
      </div>
    </div>
  );
};

export default MoraString;
