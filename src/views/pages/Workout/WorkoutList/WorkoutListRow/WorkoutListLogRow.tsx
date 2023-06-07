import React from 'react';

const WorkoutListLogRow = ({
  log,
}: {
  log: { createdAt: number; correctRatio: number };
}) => {
  const date = new Date(log.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{ flexBasis: 128 }}
      >{`${year}/${month}/${day} ${hours}:${minutes}`}</div>
      <div
        style={{ flexBasis: 40, textAlign: 'right' }}
      >{`${log.correctRatio}%`}</div>
    </div>
  );
};

export default WorkoutListLogRow;
