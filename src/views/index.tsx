import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import WorkoutList from './pages/Workout/WorkoutList';
import WorkoutPage from './pages/Workout/WorkoutPage';
import { TYPE } from './pages/Workout/commons';
import SignInPage from './pages/SignInPage';
import Layout from './Layout';
import { createContext, useEffect, useReducer } from 'react';
import { INITIAL_STATE, State } from '../Model';
import { Action, ActionTypes, reducer } from '../Update';
import { auth } from '../repositories/firebase';
import { createAudioContext } from '../services/utils';
import { userActions } from '../application/user/framework/0-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../main';

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

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        _dispatch(userActions.setUser(authUser));
      } else {
        _dispatch(userActions.removeUser());
      }
    });
  }, [dispatch]);

  // debug use redux
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

  if (authInitializing) return <></>;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={currentUser ? <TopPage /> : <SignInPage />} />
            <Route path='/list/chineseCue' element={<></>} />
            <Route path='/list/:type' element={<WorkoutList />} />

            {/* 錄音 */}
            <Route path='record'>
              <Route
                path=':workoutId'
                element={<WorkoutPage type={TYPE.record} />}
              />
            </Route>

            {/* 録音中文提示 */}
            <Route path='chineseCue'>
              <Route
                path=':workoutId'
                element={<WorkoutPage type={TYPE.chineseCue} />}
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
