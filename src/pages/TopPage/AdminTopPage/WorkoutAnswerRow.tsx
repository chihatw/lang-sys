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
  return <></>;
};

export default WorkoutAnswerRow;
