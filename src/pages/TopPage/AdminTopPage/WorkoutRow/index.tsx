import { Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import { Workout } from '../../../../Model';
import WorkoutLogTable from './WorkoutLogTable';
import WorkoutLogSummary from './WorkoutLogSummary';
import WorkoutRowHeader from './WorkoutRowHeader';

const WorkoutRow = ({ workout, type }: { workout: Workout; type: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'grid', rowGap: 8 }}>
          <WorkoutRowHeader
            open={open}
            type={type}
            setOpen={setOpen}
            workout={workout}
          />
          {!!Object.keys(workout.logs).length && (
            <WorkoutLogSummary workout={workout} type={type} />
          )}
          {open && <WorkoutLogTable workout={workout} type={type} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutRow;
