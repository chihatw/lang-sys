import { useTheme } from '@mui/material';
import React from 'react';
import { KanaWorkoutState } from '../../Model';

const KanaWorkoutResultCorrectRatio = ({
  state,
}: {
  state: KanaWorkoutState;
}) => {
  const theme = useTheme();

  let correctCount = 0;
  Object.values(state.log.practice.answers).forEach((answer, index) => {
    const kana = state.kanas[index];
    if (answer.selected === kana) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / state.kanas.length) * 100);
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

export default KanaWorkoutResultCorrectRatio;
