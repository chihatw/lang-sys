import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { auth } from 'infrastructure/firebase';
import { RootState } from 'main';
import { userActions } from 'application/authUser/framework/0-reducer';

import Layout from './Layout';
import TopPage from './pages/TopPage';
import SignInPage from './pages/SignInPage';
import ChineseCueWorkoutPage from './pages/Workout/ChineseCueWorkoutPage';
import ChineseWorkoutListPage from './pages/Workout/ChineseCueWorkoutListPage';
import ChangeUserPage from './pages/ChangeUserPage';

function App() {
  const dispatch = useDispatch();
  const { authInitializing } = useSelector(
    (state: RootState) => state.authUser
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(userActions.setUser(authUser));
      } else {
        dispatch(userActions.removeUser());
      }
    });
  }, [dispatch]);

  if (authInitializing) return <></>;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<PrivateRoute element={<TopPage />} />} />
          <Route
            path='/list/chineseCue'
            element={<PrivateRoute element={<ChineseWorkoutListPage />} />}
          />

          {/* 録音中文提示 */}
          <Route path='chineseCue'>
            <Route
              path=':workoutId'
              element={<PrivateRoute element={<ChineseCueWorkoutPage />} />}
            />
          </Route>

          <Route
            path='/signIn'
            element={<OnlyUnAuthorizedRoute element={<SignInPage />} />}
          />

          <Route
            path='/users'
            element={<OnlyAdminRoute element={<ChangeUserPage />} />}
          />

          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoute({ element }: { element: React.ReactElement }) {
  const { currentUser } = useSelector((state: RootState) => state.authUser);

  if (!currentUser.uid) {
    return <Navigate to='/signIn' />;
  }
  return element;
}

function OnlyUnAuthorizedRoute({ element }: { element: React.ReactElement }) {
  const { currentUser } = useSelector((state: RootState) => state.authUser);
  if (currentUser.uid) {
    return <Navigate to='/' />;
  }
  return element;
}

function OnlyAdminRoute({ element }: { element: React.ReactElement }) {
  const { loginUser } = useSelector((state: RootState) => state.authUser);
  if (loginUser?.uid !== import.meta.env.VITE_ADMIN_UID) {
    return <Navigate to='/' />;
  }
  return element;
}
