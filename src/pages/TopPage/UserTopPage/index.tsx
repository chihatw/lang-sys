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
      <div
        style={{
          display: 'grid',
          rowGap: 80,
          paddingTop: 120,
          paddingBottom: 300,
        }}
      >
        <TopPageCard
          label='新聽力（節奏+高低）'
          imageURL={headphoneURL}
          handleClick={() => handleClick('/list/pitchInput')}
        />

        <TopPageCard
          label='舊聽力（節奏）'
          imageURL={headphoneURL}
          handleClick={() => handleClick('/list/rhythm')}
        />

        <TopPageCard
          label='新聽力（高低）'
          imageURL={headphoneURL}
          handleClick={() => handleClick('/list/pitch')}
        />

        {/* <TopPageCard
          label='認字'
          imageURL={lettersURL}
          handleClick={() => handleClick('/list/kana')}
        /> */}
      </div>
    </Container>
  );
};

export default UserTopPage;
