import React from 'react';
import Time from './Time';

const TimePane = ({
  elapsed,
  duration,
}: {
  elapsed: number;
  duration: number;
}) => {
  return (
    <div style={{ color: '#777', marginRight: 16 }}>
      <Time seconds={elapsed} />
      <span>/</span>
      <Time seconds={duration} />
    </div>
  );
};

export default TimePane;
