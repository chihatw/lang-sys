import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';
import { Container } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../App';
import { useWhiteBoard } from '../../services/whiteboard';

const WhiteBoardPage = () => {
  const { state } = useContext(AppContext);
  const [text, setText] = useState('');

  useWhiteBoard(state.user?.uid || '', setText);

  if (!state.user) return <Navigate to='/' />;

  const lines = text.split('\n').filter((i) => i);
  const labels: string[] = [];
  const pitchStrs: string[] = [];
  for (let i = 0; i < lines.length; i = i + 2) {
    labels.push(lines[i]);
    pitchStrs.push(lines[i + 1] || '');
  }
  return (
    <Container maxWidth='md' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 4 }}>
        {labels.map((label, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <div>{label}</div>
            <SentencePitchLine
              pitchesArray={string2PitchesArray(pitchStrs[index])}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WhiteBoardPage;
