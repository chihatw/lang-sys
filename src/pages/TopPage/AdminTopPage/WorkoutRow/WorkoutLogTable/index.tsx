import React from 'react';
import { KanaWorkout, RhythmWorkout } from '../../../../../Model';
import WorkoutLogRow from './WorkoutLogRow';

const WorkoutLogTable = ({
  workout,
  type,
}: {
  workout: RhythmWorkout | KanaWorkout;
  type: string;
}) => {
  return (
    <div>
      {Object.values(workout.logs)
        .sort((a, b) => b.createdAt - a.createdAt)
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

export default WorkoutLogTable;
