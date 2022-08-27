import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { SignInFormState } from './Model';
import { auth } from '../../repositories/firebase';

const SignInForm = ({
  state,
  dispatch,
}: {
  state: SignInFormState;
  dispatch: React.Dispatch<SignInFormState>;
}) => {
  const handleChangeEMail = (email: string) => {
    const updatedState: SignInFormState = {
      ...state,
      email,
      hasError: false,
    };
    dispatch(updatedState);
  };
  const handleChangePassword = (password: string) => {
    const updatedState: SignInFormState = {
      ...state,
      password,
      hasError: false,
    };
    dispatch(updatedState);
  };
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
    } catch (e) {
      const updatedState: SignInFormState = { ...state, hasError: true };
      dispatch(updatedState);
    }
  };
  return (
    <Container maxWidth='xs' sx={{ paddingTop: 32 }}>
      <div style={{ display: 'grid', rowGap: 40 }}>
        <TextField
          size='small'
          label='email'
          autoComplete='off'
          type='email'
          required
          onChange={(e) => handleChangeEMail(e.target.value)}
        />
        <TextField
          size='small'
          label='密碼'
          autoComplete='new-password'
          type='password'
          required
          onChange={(e) => handleChangePassword(e.target.value)}
        />
        <div style={{ display: 'grid', rowGap: 16 }}>
          <Button
            fullWidth
            variant='contained'
            sx={{ color: 'white' }}
            onClick={handleSignIn}
          >
            登入
          </Button>
          {state.hasError && (
            <div
              style={{ fontSize: 12, color: 'crimson', textAlign: 'center' }}
            >
              登入失敗
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SignInForm;
