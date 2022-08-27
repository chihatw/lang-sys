import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../App';

const TopPage = () => {
  const { state } = useContext(AppContext);
  if (!state.user) return <Navigate to='/signIn' />;
  return <div>TopPage</div>;
};

export default TopPage;
