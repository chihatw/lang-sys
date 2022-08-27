import { Container, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { setWhiteBoardText } from '../../services/whiteboard';
import { WhiteBoardManageFormState } from './Model';

const WhiteBoardManageForm = ({
  state,
  dispatch,
}: {
  state: WhiteBoardManageFormState;
  dispatch: React.Dispatch<WhiteBoardManageFormState>;
}) => {
  if (state.initialize) return <></>;
  const handleChange = (text: string) => {
    setWhiteBoardText(state.uid, text);

    const updatedState: WhiteBoardManageFormState = { ...state, text };
    dispatch(updatedState);
  };
  return (
    <Container maxWidth='md' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 16 }}>
        <Select size='small' value={state.uid} sx={{ width: 240 }}>
          {state.users.map((user, index) => (
            <MenuItem key={index} value={user.uid}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          multiline
          rows={20}
          value={state.text}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </Container>
  );
};

export default WhiteBoardManageForm;
