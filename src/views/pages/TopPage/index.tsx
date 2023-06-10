import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import microphoneURL from 'assets/images/microphone.jpg';

import TopPageCard from './TopPageCard';

const TopPage = () => {
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
          label='錄音'
          imageURL={microphoneURL}
          handleClick={() => handleClick('/list/chineseCue')}
        />
      </div>
    </Container>
  );
};

export default TopPage;
