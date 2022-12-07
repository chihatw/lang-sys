import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { Check } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { TYPE } from '../../../commons';

const SelectPracticeRow = ({
  type,
  input,
  isSelected,
  handleClickRow,
}: {
  type: string;
  input: string;
  isSelected: boolean;
  handleClickRow: () => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClickRow}
    >
      <div
        style={{
          width: 240,
          display: 'flex',
          borderRadius: 4,
          border: `1px solid ${isSelected ? '#52a2aa' : '#ccc'}`,
          background: isSelected ? 'rgba(82,162,170,0.05)' : '#eee',
        }}
      >
        <div
          style={{
            flexBasis: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isSelected ? '#52a2aa' : '#ccc',
          }}
        >
          <Check />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Display type={type} input={input} />
        </div>
      </div>
    </div>
  );
};

export default SelectPracticeRow;

const Display = ({ type, input }: { type: string; input: string }) => {
  const theme = useTheme();
  switch (type) {
    case TYPE.kana:
      return (
        <div
          style={{
            ...(theme.typography as any).notoSerifJP,
            fontSize: 24,
            padding: 4,
          }}
        >
          {input}
        </div>
      );
    case TYPE.pitch:
    case TYPE.rhythm:
    default:
      return <SentencePitchLine pitchesArray={string2PitchesArray(input)} />;
  }
};
