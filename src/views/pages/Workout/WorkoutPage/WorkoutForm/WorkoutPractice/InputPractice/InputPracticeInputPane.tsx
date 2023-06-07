import React from 'react';
import { WorkoutState } from '../../../Model';
import InputPracticeButton from './InputPracticeButton';
import { buildDisableds } from './services/buildDisableds';
import { buildInput } from './services/buildInput';

const BUTTON_LABELS = 'ターンッ'.split('');

const InputPracticeInputPane = ({
  input,
  state,
  setInput,
}: {
  input: string;
  state: WorkoutState;
  setInput: (input: string) => void;
}) => {
  const disableds = buildDisableds(input, state);

  const handleClickInputButton = (clicked: string, pitch: string) => {
    const updatedInput = buildInput(input, clicked, pitch);
    setInput(updatedInput);
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <div style={{ flexBasis: 60, textAlign: 'center' }}>媽</div>
        {BUTTON_LABELS.map((label, index) => (
          <InputPracticeButton
            key={index}
            label={label}
            disabled={disableds.highs[index]}
            handleClick={() => handleClickInputButton(label, 'high')}
          />
        ))}
      </div>
      <div style={{ borderTop: '5px dashed #ccc' }} />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <div style={{ flexBasis: 60, textAlign: 'center' }}>馬</div>
        {BUTTON_LABELS.map((label, index) => (
          <InputPracticeButton
            key={index}
            label={label}
            disabled={disableds.lows[index]}
            handleClick={() => handleClickInputButton(label, 'low')}
          />
        ))}
      </div>
    </>
  );
};

export default InputPracticeInputPane;
