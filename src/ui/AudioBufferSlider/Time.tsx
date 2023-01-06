import React from 'react';

const Time = ({ seconds }: { seconds: number }) => {
  seconds = seconds > 0 ? seconds : 0;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return <span>{`${mins}:${String(secs).padStart(2, '0')}`}</span>;
};

export default Time;
