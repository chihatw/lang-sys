import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import TopPage from './pages/TopPage';
import KanaWorkout from './pages/Workout/KanaWorkout';
import RhythmKanaEditPage from './pages/Workout/RhythmKanaEditPage';
import RhythmWorkout from './pages/Workout/RhythmWorkout';
import WorkoutList from './pages/Workout/WorkoutList';

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<TopPage />} />

      <Route path='/workout'>
        <Route path='list/:type' element={<WorkoutList />} />

        {/* 認字 */}
        <Route path='kana'>
          <Route path='new/:type' element={<RhythmKanaEditPage />} />
          <Route path=':workoutId' element={<KanaWorkout />} />
          <Route
            path=':workoutId/edit/:type'
            element={<RhythmKanaEditPage />}
          />
        </Route>

        {/* 聽力 */}
        <Route path='rhythm'>
          <Route path='new/:type' element={<RhythmKanaEditPage />} />
          <Route path=':workoutId' element={<RhythmWorkout />} />
          <Route
            path=':workoutId/edit/:type'
            element={<RhythmKanaEditPage />}
          />
        </Route>
      </Route>

      <Route path='/signIn' element={<SignInPage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoute;
