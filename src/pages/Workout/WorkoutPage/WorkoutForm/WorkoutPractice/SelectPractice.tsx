import React from 'react';
import { getCues, getInput } from '../../../commons';
import { WorkoutState } from '../../Model';
import SelectPracticeRow from './SelectPracticeRow';

const SelectPractice = ({
  type,
  input,
  state,
  setInput,
}: {
  type: string;
  state: WorkoutState;
  input: string;
  setInput: (cueId: string) => void;
}) => {
  const handleClickRow = (cueId: string) => {
    cueId = input === cueId ? '' : cueId;
    setInput(cueId);
  };
  return (
    <div
      style={{
        display: 'grid',
        rowGap: 16,
        maxHeight: 260,
        overflowY: 'scroll',
        paddingTop: 24,
      }}
    >
      {getCues(type, state).map((cue, index) => (
        <SelectPracticeRow
          key={index}
          type={type}
          input={getInput(type, cue)}
          isSelected={input === cue.id}
          handleClickRow={() => handleClickRow(cue.id)}
        />
      ))}
    </div>
  );
};

export default SelectPractice;
