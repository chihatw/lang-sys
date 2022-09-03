import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import TopPage from './pages/TopPage';
import KanaWorkout from './pages/Workout/KanaWorkout';
import RhythmWorkout from './pages/Workout/RhythmWorkout';
import WorkoutList from './pages/Workout/WorkoutList';

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<TopPage />} />

      <Route path='/workout'>
        <Route path='list/:type' element={<WorkoutList />} />
        <Route path='kana/:workoutId' element={<KanaWorkout />} />
        <Route path='listening/:workoutId' element={<RhythmWorkout />} />
      </Route>

      <Route path='/signIn' element={<SignInPage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoute;
