import classroomImageURL from './images/classroom.jpg';
import trainingImageURL from './images/training.jpg';
import { Button, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../App';

const TopPage = () => {
  const { state } = useContext(AppContext);
  if (!state.user) return <Navigate to='/signIn' />;

  const handleClick = (path: string) => {
    console.log(path);
  };
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', paddingTop: 120, rowGap: 80 }}>
        <TopPageCard
          label='白板'
          imageURL={classroomImageURL}
          handleClick={() => handleClick('whiteboard')}
        />
        <TopPageCard
          label='練習'
          imageURL={trainingImageURL}
          handleClick={() => handleClick('practice')}
        />
      </div>
    </Container>
  );
};

export default TopPage;

const TopPageCard = ({
  label,
  imageURL,
  handleClick,
}: {
  label: string;
  imageURL: string;
  handleClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{ display: 'flex', cursor: 'pointer', height: 160 }}
      onClick={handleClick}
    >
      <CardMedia
        component='img'
        sx={{ width: 160, userSelect: 'none' }}
        image={imageURL}
      />
      <CardContent sx={{ flexGrow: 1, marginBottom: -1 }}>
        <div
          style={{
            ...(theme.typography as any).mPlusRounded300,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 24,
          }}
        >
          {label.split('').map((letter, index) => (
            <span
              key={index}
              style={{
                userSelect: 'none',
                paddingRight: label.split('')[index + 1] ? '1em' : 0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
