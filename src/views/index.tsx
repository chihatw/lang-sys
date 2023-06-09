import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import RecordWorkoutListPage from './pages/Workout/RecordWorkoutListPage';
import RecordWorkoutPage from './pages/Workout/RecordWorkoutPage';
import SignInPage from './pages/SignInPage';
import Layout from './Layout';
import { useEffect } from 'react';

import { auth } from '../infrastructure/firebase';

import { userActions } from '../application/user/framework/0-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../main';
import { createAudioContext } from '../application/audio/core/2-services';
import { audioActions } from '../application/audio/framework/0-reducer';
import ChineseWorkoutListPage from './pages/Workout/ChineseCueWorkoutListPage';
import ChineseCueWorkoutPage from './pages/Workout/ChineseCueWorkoutPage';

function App() {
  const dispatch = useDispatch();
  const { currentUser, authInitializing } = useSelector(
    (state: RootState) => state.user
  );

  const { audioContext } = useSelector((state: RootState) => state.audio);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(userActions.setUser(authUser));
      } else {
        dispatch(userActions.removeUser());
      }
    });
  }, [dispatch]);

  const setAudioContext = () => {
    const audioContext = createAudioContext();
    if (audioContext) {
      dispatch(audioActions.setAudioContext(audioContext));
      window.removeEventListener('click', setAudioContext);
    } else {
      dispatch(audioActions.removeAudioContext());
    }
  };

  useEffect(() => {
    if (!audioContext) {
      window.addEventListener('click', setAudioContext);
    }
  }, [audioContext]);

  if (authInitializing) return <></>;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={currentUser ? <TopPage /> : <SignInPage />} />
          <Route
            path='/list/chineseCue'
            element={currentUser ? <ChineseWorkoutListPage /> : <SignInPage />}
          />
          <Route
            path='/list/record'
            element={currentUser ? <RecordWorkoutListPage /> : <SignInPage />}
          />

          {/* 錄音 */}
          <Route path='record'>
            <Route
              path=':workoutId'
              element={currentUser ? <RecordWorkoutPage /> : <SignInPage />}
            />
          </Route>

          {/* 録音中文提示 */}
          <Route path='chineseCue'>
            <Route
              path=':workoutId'
              element={currentUser ? <ChineseCueWorkoutPage /> : <SignInPage />}
            />
          </Route>

          <Route path='/signIn' element={<SignInPage />} />

          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
