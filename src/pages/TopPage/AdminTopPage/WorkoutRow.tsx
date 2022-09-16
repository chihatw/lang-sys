import React from 'react';
import { KanaWorkout, RhythmWorkout } from '../../../Model';
import WorkoutLogRow from './WorkoutLogRow';

const WorkoutRow = ({
  workout,
  type,
}: {
  workout: RhythmWorkout | KanaWorkout;
  type: string;
}) => {
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <div>{workout.title}</div>
      {Object.values(workout.logs)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((log, index) => (
          <WorkoutLogRow
            key={index}
            log={log}
            correctAnswers={type === 'rhythm' ? log.cueIds : log.kanas}
          />
        ))}
    </div>
  );
};

export default WorkoutRow;
