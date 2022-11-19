import { Check, Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import React from 'react';
import { getCueIds, getCues, getInput } from '../../../../../commons';
import { WorkoutState } from '../../../../Model';
import WorkoutResultTableCell from './WorkoutResultTableCell';

const WorkoutResultTableRow = ({
  type,
  index,
  state,
  handleClick,
}: {
  type: string;
  index: number;
  state: WorkoutState;
  handleClick: (cueId: string) => void;
}) => {
  const theme = useTheme();
  const cues = getCues(type, state);
  const cueIds = getCueIds(type, state);

  const cueId = cueIds[index];
  const answerId = state.log.practice.answers[index].selected;
  const isCorrect = cueId == answerId;

  const cue = cues.find((item) => item.id === cueId);
  if (!cue) return <></>;

  const answer = cues.find((item) => item.id === answerId);
  if (!answer) return <></>;

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
      <WorkoutResultTableCell
        type={type}
        input={getInput(type, cue)}
        handleClick={() => handleClick(cue.id)}
      />
      <WorkoutResultTableCell
        type={type}
        input={getInput(type, answer)}
        isIncorrect={!isCorrect}
        handleClick={() => handleClick(answer.id)}
      />
    </div>
  );
};

export default WorkoutResultTableRow;
