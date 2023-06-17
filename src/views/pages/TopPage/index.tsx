import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import microphoneURL from 'assets/images/microphone.jpg';

import TopPageCard from './TopPageCard';
import { useCallback } from 'react';

const TopPage = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/list/chineseCue');
  }, []);
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
          label='錄音'
          imageURL={microphoneURL}
          handleClick={handleClick}
        />
      </div>
    </Container>
  );
};

export default TopPage;
