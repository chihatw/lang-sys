import React, { createContext, useEffect, useReducer } from 'react';
import AppRoute from './AppRoute';
import Layout from './Layout';
import { INITIAL_STATE, State } from './Model';
import { auth as firebaseAuth } from './repositories/firebase';
import { createAudioContext } from './services/utils';
import { Action, ActionTypes, reducer } from './Update';

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(async (user) => {
      dispatch({ type: ActionTypes.setUser, payload: user });
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const { audioContext } = state;
    const _createAudioContext = () => {
      const _audioContext = createAudioContext();
      dispatch({ type: ActionTypes.setAudioContext, payload: _audioContext });
      window.removeEventListener('click', _createAudioContext);
    };
    if (!audioContext) {
      window.addEventListener('click', _createAudioContext);
    }
  }, [state.audioContext]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        <AppRoute />
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
