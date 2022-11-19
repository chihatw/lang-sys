import React from 'react';
import { Workout } from '../../../../../Model';
import WorkoutLogRow from './WorkoutLogRow';

const WorkoutLogTable = ({
  workout,
  type,
}: {
  workout: Workout;
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
