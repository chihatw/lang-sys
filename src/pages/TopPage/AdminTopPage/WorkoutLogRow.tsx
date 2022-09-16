import React from 'react';
import { KanaWorkoutLog, RhythmWorkoutLog } from '../../../Model';
import WorkoutAnswerRow from './WorkoutAnswerRow';

const WorkoutLogRow = ({
  log,
  correctAnswers,
}: {
  log: KanaWorkoutLog | RhythmWorkoutLog;
  correctAnswers: string[];
}) => {
  const date = new Date(log.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return (
    <div style={{ display: 'grid', rowGap: 4, fontSize: 12 }}>
      <div>{`${year}/${month}/${day}`}</div>
      {Object.values(log.practice.answers).map((answer, index) => (
        <WorkoutAnswerRow
          index={index}
          log={log}
          answer={answer}
          key={index}
          correctAnswer={correctAnswers[index]}
        />
      ))}
    </div>
  );
};

export default WorkoutLogRow;
