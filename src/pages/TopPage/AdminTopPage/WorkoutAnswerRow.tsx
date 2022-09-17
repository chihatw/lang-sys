import React from 'react';
import { KanaWorkoutLog, RhythmWorkoutLog } from '../../../Model';

const WorkoutAnswerRow = ({
  log,
  index,
  answer,
  correctAnswer,
}: {
  log: RhythmWorkoutLog | KanaWorkoutLog;
  index: number;

  answer: {
    createdAt: number;
    playedAt: number[];
    selected: string;
  };
  correctAnswer: string;
}) => {
  let duration: number =
    answer.createdAt -
    (index - 1 < 0 ? log.createdAt : log.practice.answers[index - 1].createdAt);
  duration = Math.round(duration / 100) / 10;

  const isIncorrect = correctAnswer !== answer.selected;
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: 40 }}>{correctAnswer}</div>
      <div style={{ flexBasis: 40, color: isIncorrect ? 'red' : 'inherit' }}>
        {answer.selected}
      </div>
      <div style={{ flexBasis: 40, textAlign: 'right' }}>
        {`${duration.toFixed(1)}秒`}
      </div>
    </div>
  );
};

export default WorkoutAnswerRow;
