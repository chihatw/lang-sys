import headphoneURL from '../../../assets/images/headphone.jpg';
import lettersURL from '../../../assets/images/letters.jpg';
import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopPageCard from './TopPageCard';

const UserTopPage = () => {
  const navigate = useNavigate();
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

export default UserTopPage;
