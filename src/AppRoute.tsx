import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import TopPage from './pages/TopPage';

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<TopPage />} />
      <Route path='/signIn' element={<SignInPage />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoute;
