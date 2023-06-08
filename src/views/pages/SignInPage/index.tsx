import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../main';
import { signinFormActions } from '../../../application/signinForm/framework/0-reducer';
import { Button, Container, TextField } from '@mui/material';

const SignInPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  const { email, password, hasError } = useSelector(
    (state: RootState) => state.signinForm
  );

  const handleSignIn = async () => {
    dispatch(signinFormActions.signinInitiate({ email, password }));
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
          value={email}
          onChange={(e) =>
            dispatch(signinFormActions.changeEmail(e.target.value))
          }
        />
        <TextField
          size='small'
          label='密碼'
          autoComplete='new-password'
          type='password'
          required
          value={password}
          onChange={(e) =>
            dispatch(signinFormActions.changePassword(e.target.value))
          }
        />
        <div style={{ display: 'grid', rowGap: 16 }}>
          <Button
            fullWidth
            variant='contained'
            sx={{ color: 'white' }}
            onClick={handleSignIn}
            disabled={!email || !password}
          >
            登入
          </Button>
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
