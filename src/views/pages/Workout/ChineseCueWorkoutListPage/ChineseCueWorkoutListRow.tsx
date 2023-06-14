import { Delete } from '@mui/icons-material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, IconButton, useTheme } from '@mui/material';

import { RootState } from 'main';
import AudioBufferSlider from 'views/components/AudioBufferSlider';
import { CHINESE_CUE_WORKOUT_STORAGE_PATH } from 'application/chineseCueWorkouts/core/1-constants';
import { audioActions } from 'application/audio/framework/0-reducer';

function ChineseCueWorkoutListRow({ workoutId }: { workoutId: string }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fetchedAudioBuffers } = useSelector(
    (state: RootState) => state.audio
  );
  const { chineseCueWorkouts } = useSelector((state: RootState) => state);

  const audioBuffer = useMemo(() => {
    const path = CHINESE_CUE_WORKOUT_STORAGE_PATH + workoutId;
    return fetchedAudioBuffers[path] || null;
  }, [workoutId, fetchedAudioBuffers]);

  const handleClick = () => {
    navigate(`/chineseCue/${workoutId}`);
  };

  const handleDelete = () => {
    const path = CHINESE_CUE_WORKOUT_STORAGE_PATH + workoutId;
    dispatch(audioActions.removeFetchedAudioBuffer(path));
  };

  const workout = chineseCueWorkouts[workoutId];
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
      {!!audioBuffer && (
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
            <AudioBufferSlider audioBuffer={audioBuffer} />
          </div>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default ChineseCueWorkoutListRow;
