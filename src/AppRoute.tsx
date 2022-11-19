import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import TopPage from './pages/TopPage';
import { TYPE } from './pages/Workout/commons';
import WorkoutEditPage from './pages/Workout/WorkoutEditPage';
import WorkoutPage from './pages/Workout/WorkoutPage';

import WorkoutList from './pages/Workout/WorkoutList';

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<TopPage />} />
      <Route path='/list/:type' element={<WorkoutList />} />
      {/* 認字 */}
      <Route path='kana'>
        <Route path='new' element={<WorkoutEditPage />} />
        <Route path=':workoutId' element={<WorkoutPage type={TYPE.kana} />} />
        <Route path=':workoutId/edit' element={<WorkoutEditPage />} />
      </Route>

      {/* 聽力 */}
      <Route path='rhythm'>
        <Route path='new' element={<WorkoutEditPage />} />
        <Route path=':workoutId' element={<WorkoutPage type={TYPE.rhythm} />} />
        <Route path=':workoutId/edit' element={<WorkoutEditPage />} />
      </Route>

      {/* 聽力（ピッチ） */}
      <Route path='pitch'>
        <Route path=':workoutId' element={<WorkoutPage type={TYPE.pitch} />} />
      </Route>

      <Route path='/signIn' element={<SignInPage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoute;
