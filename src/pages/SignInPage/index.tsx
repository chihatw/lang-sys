import React, { useContext, useEffect, useReducer } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { INITIAL_SIGN_IN_FORM_STATE, SignInFormState } from './Model';
import SignInForm from './SignInForm';
import { signInFormReducer } from './Update';

const SignInPage = () => {
  const { state } = useContext(AppContext);

  const [signInFormState, signInFormDispatch] = useReducer(
    signInFormReducer,
    INITIAL_SIGN_IN_FORM_STATE
  );

  useEffect(() => {
    const signInFormState: SignInFormState = {
      ...INITIAL_SIGN_IN_FORM_STATE,
      email: state.user?.email || '',
    };
    signInFormDispatch(signInFormState);
  }, [state.user]);

  if (state.authInitializing) return <></>;
  if (state.user) return <Navigate to='/' />;

  return <SignInForm state={signInFormState} dispatch={signInFormDispatch} />;
};

export default SignInPage;
