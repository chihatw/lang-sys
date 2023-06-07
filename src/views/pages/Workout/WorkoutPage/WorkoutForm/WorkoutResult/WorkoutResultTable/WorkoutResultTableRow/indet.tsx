import { Check, Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material';

import { inputSwitch } from '../../../../../commons';
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

  const cueIds = state.cues.map((cue) => cue.id);
  const cueId = cueIds[index];
  const answerId = state.log.practice.answers[index].selected;
  const isCorrect = cueId == answerId;

  const cue = state.cues.find((item) => item.id === cueId);
  if (!cue) return <></>;

  const answer = state.cues.find((item) => item.id === answerId);
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
        input={inputSwitch(type, cue)}
        handleClick={() => handleClick(cue.id)}
      />
      <WorkoutResultTableCell
        type={type}
        input={inputSwitch(type, answer)}
        isIncorrect={!isCorrect}
        handleClick={() => handleClick(answer.id)}
      />
    </div>
  );
};

export default WorkoutResultTableRow;
