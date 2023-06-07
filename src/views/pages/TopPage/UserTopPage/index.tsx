import microphoneURL from '../../../../assets/images/microphone.jpg';
import { Container } from '@mui/material';
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
          label='錄音'
          imageURL={microphoneURL}
          handleClick={() => handleClick('/list/record')}
        />

        <TopPageCard
          label='中文提示'
          imageURL={microphoneURL}
          handleClick={() => handleClick('/list/chineseCue')}
        />

        {/* <TopPageCard
          label='聽力（節奏+高低）'
          imageURL={headphoneURL}
          handleClick={() => handleClick('/list/pitchInput')}
        /> */}

        {/* <TopPageCard
          label='舊聽力（節奏）'
          imageURL={headphoneURL}
          handleClick={() => handleClick('/list/rhythm')}
        /> */}

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
