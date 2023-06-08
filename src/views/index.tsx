import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import WorkoutList from './pages/Workout/WorkoutList';
import WorkoutPage from './pages/Workout/WorkoutPage';
import SignInPage from './pages/SignInPage';
import Layout from './Layout';
import { createContext, useEffect, useReducer } from 'react';
import { INITIAL_STATE, State } from '../Model';
import { Action, reducer } from '../Update';
import { auth } from '../repositories/firebase';

import { userActions } from '../application/user/framework/0-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../main';
import { createAudioContext } from '../application/audio/core/2-services';
import { audioActions } from '../application/audio/framework/0-reducer';

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const _dispatch = useDispatch();
  const { currentUser, authInitializing } = useSelector(
    (state: RootState) => state.user
  );

  const { audioContext } = useSelector((state: RootState) => state.audio);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        _dispatch(userActions.setUser(authUser));
      } else {
        _dispatch(userActions.removeUser());
      }
    });
  }, [dispatch]);

  const setAudioContext = () => {
    const audioContext = createAudioContext();
    if (audioContext) {
      _dispatch(audioActions.setAudioContext(audioContext));
      window.removeEventListener('click', setAudioContext);
    } else {
      _dispatch(audioActions.removeAudioContext());
    }
  };

  useEffect(() => {
    if (!audioContext) {
      window.addEventListener('click', setAudioContext);
    }
  }, [audioContext]);

  if (authInitializing) return <></>;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={currentUser ? <TopPage /> : <SignInPage />} />
            <Route path='/list/chineseCue' element={<></>} />
            <Route
              path='/list/record'
              element={currentUser ? <WorkoutList /> : <SignInPage />}
            />

            {/* 錄音 */}
            <Route path='record'>
              <Route
                path=':workoutId'
                element={currentUser ? <WorkoutPage /> : <SignInPage />}
              />
            </Route>

            {/* 録音中文提示 */}
            <Route path='chineseCue'>
              <Route
                path=':workoutId'
                element={currentUser ? <WorkoutPage /> : <SignInPage />}
              />
            </Route>

            <Route path='/signIn' element={<SignInPage />} />

            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
