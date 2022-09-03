import { Check, Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import React from 'react';
import { PITCHES } from '../../../../../../../assets/pitches';
import { RhythmWorkoutState } from '../../../../Model';
import RhythmWorkoutResultTableCell from './RhythmWorkoutResultTableCell';

const RhythmWorkoutResultTableRow = ({
  index,
  state,
  handleClick,
}: {
  index: number;
  state: RhythmWorkoutState;
  handleClick: (start: number, end: number, type: string) => void;
}) => {
  const theme = useTheme();
  const cueId = state.cueIds[index];
  const cue = PITCHES[cueId];
  const answerId = state.log.practice.answers[index].selected;
  const answer = PITCHES[answerId];
  const isCorrect = cueId == answerId;

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
      <RhythmWorkoutResultTableCell
        pitchStr={cue.pitchStr}
        handleClick={() => handleClick(cue.start, cue.end, `cue_${cue.id}`)}
      />
      <RhythmWorkoutResultTableCell
        pitchStr={answer.pitchStr}
        isIncorrect={!isCorrect}
        handleClick={() =>
          handleClick(answer.start, answer.end, `answer_${answer.id}`)
        }
      />
    </div>
  );
};

export default RhythmWorkoutResultTableRow;
