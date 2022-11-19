import React from 'react';
import { WorkoutLog } from '../../../../../Model';

const LastLog = ({ logs }: { logs: { [id: string]: WorkoutLog } }) => {
  if (!Object.keys(logs).length) return <></>;
  const lastLog: WorkoutLog = Object.values(logs).sort(
    (a, b) => b.createdAt - a.createdAt
  )[0];
  const date = new Date(lastLog.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  let correctCount = 0;
  // todo type による分岐
  const correctAnswers = lastLog.cueIds || lastLog.kanas;
  Object.values(lastLog.practice.answers).forEach((answer, index) => {
    if (answer.selected === correctAnswers[index]) {
      correctCount++;
    }
  });

  const correctRatio = Math.round((correctCount / correctAnswers.length) * 100);

  return (
    <div style={{ display: 'flex', fontSize: 12 }}>
      <div style={{ flexBasis: 40 }}>last:</div>
      <div
        style={{ flexBasis: 120 }}
      >{`${year}/${month}/${day} ${hours}:${minutes}`}</div>
      <div>{`${correctRatio}%`}</div>
    </div>
  );
};

export default LastLog;
