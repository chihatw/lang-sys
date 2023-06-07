import { Card, CardContent, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IRecordWorkout } from '../../../../../application/recordWorkouts/core/0-interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../main';
import AudioBufferSlider from '../../../../components/AudioBufferSlider';
import { Delete } from '@mui/icons-material';
import { recordWorkoutsActions } from '../../../../../application/recordWorkouts/framework/0-reducer';

const WorkoutListRow = ({
  workout,
  audioBuffer,
}: {
  workout: IRecordWorkout;
  audioBuffer: AudioBuffer | null;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { audioContext } = useSelector((state: RootState) => state.audio);

  const handleClick = () => {
    navigate(`/record/${workout.id}`);
  };

  const handleDelete = () => {
    dispatch(recordWorkoutsActions.removeAudioBuffer(workout.id));
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
              {workout.title}
            </div>
          </div>
        </CardContent>
      </Card>
      {!!audioBuffer && !!audioContext && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: 8,
            paddingTop: 8,
            paddingBottom: 16,
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <AudioBufferSlider
              audioBuffer={audioBuffer}
              audioContext={audioContext}
            />
          </div>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <Delete />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default WorkoutListRow;
