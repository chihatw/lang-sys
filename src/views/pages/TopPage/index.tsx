import microphoneURL from '../../../assets/images/microphone.jpg';
import { Container } from '@mui/material';
import TopPageCard from './TopPageCard';
import { useNavigate } from 'react-router-dom';

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
