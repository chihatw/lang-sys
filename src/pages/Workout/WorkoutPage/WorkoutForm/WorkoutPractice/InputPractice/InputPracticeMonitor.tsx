import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { Backspace } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { removeLastMora } from './services/removeLastMora';

const InputPracticeMonitor = ({
  input,
  setInput,
}: {
  input: string;
  setInput: (input: string) => void;
}) => {
  const handleBackSpace = () => {
    const updatedInput = removeLastMora(input);
    setInput(updatedInput);
  };
  return (
    <div
      style={{
        display: 'flex',
        height: 40,
        border: '1px solid #ccc',
        padding: 8,
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 16,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flexBasis: 40 }} />
      <div
        style={{
          flexBasis: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SentencePitchLine pitchesArray={string2PitchesArray(input)} />
      </div>
      <IconButton onClick={handleBackSpace}>
        <Backspace />
      </IconButton>
    </div>
  );
};

export default InputPracticeMonitor;
