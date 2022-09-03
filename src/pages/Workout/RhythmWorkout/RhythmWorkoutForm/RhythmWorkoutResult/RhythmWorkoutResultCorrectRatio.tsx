import { useTheme } from '@mui/material';
import React from 'react';
import { RhythmWorkoutState } from '../../Model';

const RhythmWorkoutResultCorrectRatio = ({
  state,
}: {
  state: RhythmWorkoutState;
}) => {
  let correctCount = 0;
  Object.values(state.log.practice.answers).forEach((answer, index) => {
    const cueId = state.cueIds[index];
    if (answer.selected === cueId) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / state.cueIds.length) * 100);
  const theme = useTheme();
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

export default RhythmWorkoutResultCorrectRatio;
