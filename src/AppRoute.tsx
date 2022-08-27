import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import TopPage from './pages/TopPage';
import WhiteBoardManage from './pages/WhiteBoardManage';
import WhiteBoardPage from './pages/WhiteBoardPage';

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<TopPage />} />
      {/* whiteboard */}
      <Route path='/whiteboard'>
        <Route index element={<WhiteBoardPage />} />
        <Route path='mng' element={<WhiteBoardManage />} />
      </Route>
      <Route path='/signIn' element={<SignInPage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoute;
