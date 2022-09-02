import { Card, CardContent, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutListItem } from './Model';

const WorkoutRow = ({ listItem }: { listItem: WorkoutListItem }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/workout/${listItem.type}/${listItem.id}`);
  };
  return (
    <Card
      sx={{
        cursor: 'pointer',
        WebkitTapHighlightColor: '#EAF4F5',
        '&:active,&:focus': { background: '#EAF4F5' },
      }}
      onClick={handleClick}
      elevation={1}
    >
      <CardContent>
        <div
          style={{
            ...(theme.typography as any).mPlusRounded300,
            rowGap: 8,
            display: 'grid',
            minHeight: 40,
            userSelect: 'none',
            marginBottom: -8,
          }}
        >
          <div
            style={{ fontSize: 20, lineHeight: '40px', textAlign: 'center' }}
          >
            {listItem.title}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutRow;
