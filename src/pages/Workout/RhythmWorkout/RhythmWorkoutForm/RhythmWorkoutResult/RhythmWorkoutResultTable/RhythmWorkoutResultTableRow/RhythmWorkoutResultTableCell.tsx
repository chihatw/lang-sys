import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { PlayArrowRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';

const RhythmWorkoutResultTableCell = ({
  pitchStr,
  isIncorrect,
  handleClick,
}: {
  pitchStr: string;
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
      <SentencePitchLine pitchesArray={string2PitchesArray(pitchStr)} />
      <IconButton color='primary' onClick={handleClick}>
        <PlayArrowRounded />
      </IconButton>
    </div>
  );
};

export default RhythmWorkoutResultTableCell;
