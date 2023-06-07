import { Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TYPE } from '../../commons';
import { WorkoutListItem } from '../Model';
import WorkoutListLogRow from './WorkoutListLogRow';
import WorkoutListRecordWorkoutRow from './WorkoutListRecordWorkoutRow';

const WorkoutListRow = ({
  listItem,
  type,
}: {
  listItem: WorkoutListItem;
  type: string;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${listItem.type}/${listItem.id}`);
  };

  return (
    <div>
      <Card
        sx={{
          cursor: 'pointer',
          WebkitTapHighlightColor: '#EAF4F5',
          '&:active,&:focus': { backgroundColor: '#EAF4F5' },
        }}
        onClick={handleClick}
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
            <WorkoutListLogRowSwitch type={type} listItem={listItem} />
          </div>
        </CardContent>
      </Card>
      {type === TYPE.record && (
        <WorkoutListRecordWorkoutRow listItem={listItem} />
      )}
    </div>
  );
};

export default WorkoutListRow;

const WorkoutListLogRowSwitch = ({
  listItem,
  type,
}: {
  listItem: WorkoutListItem;
  type: string;
}) => {
  switch (type) {
    case TYPE.kana:
    case TYPE.pitch:
    case TYPE.pitchInput:
    case TYPE.rhythm:
      if (!listItem.logs.length) return <></>;
      return (
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
      );
    case TYPE.record:
      return <></>;
    default:
      console.error(`incorrect type: ${type}`);
      return <></>;
  }
};
