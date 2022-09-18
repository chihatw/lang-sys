import React from 'react';
import { PITCHES } from '../../../../../../assets/pitches';
import { KanaWorkoutLog, RhythmWorkoutLog } from '../../../../../../Model';

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
      <div style={{ flexBasis: 60, color: isIncorrect ? 'red' : 'inherit' }}>
        {getKana(correctAnswer)}
      </div>
      <div style={{ flexBasis: 60 }}>{getKana(answer.selected)}</div>
      <div style={{ flexBasis: 40, textAlign: 'right' }}>
        {`${duration.toFixed(1)}秒`}
      </div>
    </div>
  );
};

export default WorkoutAnswerRow;

const getKana = (key: string): string =>
  !!PITCHES[key] ? PITCHES[key].pitchStr.replace('＼', '') : key;
