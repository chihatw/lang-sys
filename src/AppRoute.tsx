import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import TopPage from './pages/TopPage';
import RhythmWorkout from './pages/Workout/RhythmWorkout';
import WorkoutList from './pages/Workout/WorkoutList';

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<TopPage />} />

      <Route path='/workout'>
        <Route path='list/:type' element={<WorkoutList />} />
        <Route path='listening/:workoutId' element={<RhythmWorkout />} />
      </Route>

      <Route path='/signIn' element={<SignInPage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoute;
