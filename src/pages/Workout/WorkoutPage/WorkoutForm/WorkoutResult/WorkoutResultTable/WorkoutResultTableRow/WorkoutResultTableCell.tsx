import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { PlayArrowRounded } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { TYPE } from '../../../../../commons';

const WorkoutResultTableCell = ({
  type,
  input,
  isIncorrect,
  handleClick,
}: {
  type: string;
  input: string;
  isIncorrect?: boolean;
  handleClick: () => void;
}) => {
  return (
    <div
      style={{
        flexBasis: 180,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        justifyContent: 'center',
        background: isIncorrect ? 'rgba(255,0,0,0.1)' : 'transparent',
      }}
    >
      <Display type={type} input={input} />
      <IconButton color='primary' onClick={handleClick}>
        <PlayArrowRounded />
      </IconButton>
    </div>
  );
};

export default WorkoutResultTableCell;

const Display = ({ type, input }: { type: string; input: string }) => {
  const theme = useTheme();
  switch (type) {
    case TYPE.kana:
      return (
        <div
          style={{
            ...(theme.typography as any).notoSerifJP,
            fontSize: 24,
          }}
        >
          {input}
        </div>
      );
    case TYPE.pitch:
    case TYPE.rhythm:
      return <SentencePitchLine pitchesArray={string2PitchesArray(input)} />;
    default:
      return <></>;
  }
};
