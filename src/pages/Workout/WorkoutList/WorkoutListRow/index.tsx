import { Lock } from '@mui/icons-material';
import { Card, CardContent, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutListItem } from '../Model';
import WorkoutListLogRow from './WorkoutListLogRow';

const WorkoutListRow = ({ listItem }: { listItem: WorkoutListItem }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${listItem.type}/${listItem.id}`);
  };
  const backgroundColor = listItem.isLocked ? 'translate' : '#EAF4F5';
  return (
    <Card
      sx={{
        cursor: listItem.isLocked ? 'auto' : 'pointer',
        WebkitTapHighlightColor: backgroundColor,
        '&:active,&:focus': { backgroundColor },
      }}
      onClick={() => {
        !listItem.isLocked && handleClick();
      }}
      elevation={1}
    >
      <CardContent sx={{ position: 'relative' }}>
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
          {!!listItem.logs.length && (
            <div
              style={{
                display: 'grid',
                rowGap: 4,
                color: '#aaa',
                fontSize: 14,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ flexBasis: 168 }}>練習紀錄</div>
              </div>
              {listItem.logs.map((log, index) => (
                <WorkoutListLogRow log={log} key={index} />
              ))}
            </div>
          )}
        </div>
        {listItem.isLocked && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              background: 'rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '1em',
            }}
          >
            <div style={{ width: 240 }}>
              <Lock sx={{ fontSize: 40, color: '#52a2aa' }} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutListRow;
