import headphoneURL from './images/headphone.jpg';
import lettersURL from './images/letters.jpg';

import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import TopPageCard from './TopPageCard';
import { Container } from '@mui/material';

const TopPage = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  if (!state.user) return <Navigate to='/signIn' />;

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', paddingTop: 120, rowGap: 80 }}>
        <TopPageCard
          label='聽力'
          imageURL={headphoneURL}
          handleClick={() => handleClick('/workout/list/listening')}
        />
        <TopPageCard
          label='認字'
          imageURL={lettersURL}
          handleClick={() => handleClick('/workout/list/kana')}
        />
      </div>
    </Container>
  );
};

export default TopPage;
