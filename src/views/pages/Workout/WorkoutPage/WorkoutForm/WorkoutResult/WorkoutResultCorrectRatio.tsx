import { useTheme } from '@mui/material';
import React from 'react';
import { WorkoutLog } from '../../../../../../Model';
import { getCueIdsFromLog } from '../../../commons';
import { calcCorrectRatio } from '../../../WorkoutList/Model';

const WorkoutResultCorrectRatio = ({
  type,
  log,
}: {
  type: string;
  log: WorkoutLog;
}) => {
  const theme = useTheme();
  const correctRatio = calcCorrectRatio(log, getCueIdsFromLog(type, log));
  return (
    <div
      style={{
        ...(theme.typography as any).lato900,
        textAlign: 'center',
        fontSize: 100,
        color: '#aaa',
      }}
    >{`${correctRatio}%`}</div>
  );
};

export default WorkoutResultCorrectRatio;
