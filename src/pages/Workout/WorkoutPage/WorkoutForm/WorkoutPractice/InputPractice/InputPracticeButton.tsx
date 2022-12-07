import { Button } from '@mui/material';
import React from 'react';

const InputPracticeButton = ({
  label,
  disabled,
  handleClick,
}: {
  label: string;
  disabled: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button
      variant='outlined'
      sx={{ flexGrow: 1, visibility: disabled ? 'hidden' : 'visible' }}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default InputPracticeButton;
