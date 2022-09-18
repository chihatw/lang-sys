import React from 'react';
import { KanaWorkoutLog, RhythmWorkoutLog } from '../../../../../Model';

const LastLog = ({
  logs,
}: {
  logs:
    | {
        [id: string]: RhythmWorkoutLog;
      }
    | {
        [id: string]: KanaWorkoutLog;
      };
}) => {
  if (!Object.keys(logs).length) return <></>;
  const lastLog: RhythmWorkoutLog | KanaWorkoutLog = Object.values(logs).sort(
    (a, b) => b.createdAt - a.createdAt
  )[0];
  const date = new Date(lastLog.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  let correctCount = 0;
  const correctAnswers =
    (lastLog as RhythmWorkoutLog).cueIds || (lastLog as KanaWorkoutLog).kanas;
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
