import { Check, Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import React from 'react';
import { KANAS } from '../../../../../../../assets/kanas';
import { KanaWorkoutState } from '../../../../Model';
import KanaWorkoutResultTableCell from './KanaWorkoutResultTableCell';

const KanaWorkoutResultTableRow = ({
  index,
  state,
  handleClick,
}: {
  index: number;
  state: KanaWorkoutState;
  handleClick: (start: number, end: number, type: string) => void;
}) => {
  const theme = useTheme();
  const kana = state.kanas[index];
  const cue = Object.values(KANAS).find((item) =>
    [item.hira, item.kata].includes(kana)
  )!;
  const answerKana = state.log.practice.answers[index].selected;
  const answerCue = Object.values(KANAS).find((item) =>
    [item.hira, item.kata].includes(answerKana)
  )!;
  const isCorrect = kana == answerKana;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          flexBasis: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: '#555',
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          flexBasis: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: isCorrect ? '#52a2aa' : 'red',
        }}
      >
        {isCorrect ? <Check /> : <Clear />}
      </div>
      <KanaWorkoutResultTableCell
        kana={kana}
        handleClick={() => handleClick(cue.start, cue.end, `cue_${kana}`)}
      />
      <KanaWorkoutResultTableCell
        kana={answerKana}
        isIncorrect={!isCorrect}
        handleClick={() =>
          handleClick(answerCue.start, answerCue.end, `cue_${kana}`)
        }
      />
    </div>
  );
};

export default KanaWorkoutResultTableRow;
