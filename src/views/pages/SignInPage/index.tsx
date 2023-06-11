import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main';
import { Button, CircularProgress, Container, TextField } from '@mui/material';
import { signinFormActions } from 'application/signinForm/framework/0-reducer';
import { useEffect, useState } from 'react';

const SignInPage = () => {
  const dispatch = useDispatch();

  const { hasError, isLoading } = useSelector(
    (state: RootState) => state.signinForm
  );

  const [state, setState] = useState({ email: '', password: '' });

  useEffect(() => {
    if (hasError) {
      dispatch(signinFormActions.resetHasError());
    }
  }, [state]);

  const handleSignIn = async () => {
    dispatch(
      signinFormActions.signinInitiate({
        email: state.email,
        password: state.password,
      })
    );
    setState({ email: '', password: '' });
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
          value={state.email}
          onChange={(e) =>
            setState((currentState) => ({
              ...currentState,
              email: e.target.value,
            }))
          }
        />
        <TextField
          size='small'
          label='密碼'
          autoComplete='new-password'
          type='password'
          required
          value={state.password}
          onChange={(e) =>
            setState((currentState) => ({
              ...currentState,
              password: e.target.value,
            }))
          }
        />
        <div style={{ display: 'grid', rowGap: 16 }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              fullWidth
              variant='contained'
              sx={{ color: 'white' }}
              onClick={handleSignIn}
              disabled={!state.email || !state.password}
            >
              登入
            </Button>
          )}

          {hasError && (
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

export default SignInPage;
