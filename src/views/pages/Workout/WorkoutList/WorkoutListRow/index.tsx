import { Card, CardContent, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../main';
import AudioBufferSlider from '../../../../components/AudioBufferSlider';
import { Delete } from '@mui/icons-material';
import { recordWorkoutListActions } from '../../../../../application/recordWorkoutList/framework/0-reducer';
import { RECORD_WORKOUT_STORAGE_PATH } from '../../../../../application/recordWorkouts/core/1-constants';
import { useEffect, useState } from 'react';

const WorkoutListRow = ({ workoutId }: { workoutId: string }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { audioContext, audioBuffers } = useSelector(
    (state: RootState) => state.audio
  );
  const { recordWorkouts } = useSelector((state: RootState) => state);
  const { audioBufferPaths } = useSelector(
    (state: RootState) => state.recordWorkoutList
  );

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    let audioBuffer: null | AudioBuffer = null;
    const path = RECORD_WORKOUT_STORAGE_PATH + workoutId;
    if (audioBufferPaths.includes(path)) {
      audioBuffer = audioBuffers[path];
    }
    setAudioBuffer(audioBuffer);
  }, [workoutId, audioBufferPaths]);

  const handleClick = () => {
    navigate(`/record/${workoutId}`);
  };

  const handleDelete = () => {
    const path = RECORD_WORKOUT_STORAGE_PATH + workoutId;
    dispatch(recordWorkoutListActions.removeAudioBufferPath(path));
  };

  const workout = recordWorkouts[workoutId];
  if (!workout) return <></>;

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
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default WorkoutListRow;
