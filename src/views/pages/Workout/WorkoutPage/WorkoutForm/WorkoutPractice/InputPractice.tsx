import React from 'react';
import { WorkoutState } from '../../Model';
import InputPracticeMonitor from './InputPractice/InputPracticeMonitor';
import InputPracticeInputPane from './InputPractice/InputPracticeInputPane';

const InputPractice = ({
  input,
  state,
  setInput,
}: {
  state: WorkoutState;
  input: string;
  setInput: (cueId: string) => void;
}) => {
  return (
    <>
      <InputPracticeMonitor input={input} setInput={setInput} />
      <InputPracticeInputPane state={state} input={input} setInput={setInput} />
    </>
  );
};

export default InputPractice;
