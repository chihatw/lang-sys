import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../App';
import UserTopPage from './UserTopPage';
import AdminTopPage from './AdminTopPage';

const TopPage = () => {
  const { state } = useContext(AppContext);
  if (!state.user) return <Navigate to='/signIn' />;
  switch (state.user.uid) {
    case import.meta.env.VITE_USER_CHEN_UID:
      return <UserTopPage />;
    case import.meta.env.VITE_ADMIN_UID:
      return <AdminTopPage />;
    default:
      return <></>;
  }
};

export default TopPage;
