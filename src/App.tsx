import React, { createContext, useEffect, useReducer } from 'react';
import AppRoute from './AppRoute';
import Layout from './Layout';
import { INITIAL_STATE, State } from './Model';
import { auth as firebaseAuth } from './repositories/firebase';
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        <AppRoute />
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
