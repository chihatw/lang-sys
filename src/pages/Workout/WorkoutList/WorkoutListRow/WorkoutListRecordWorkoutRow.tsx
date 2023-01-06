import * as R from 'ramda';
import { IconButton } from '@mui/material';

import { useContext, useMemo } from 'react';
import { AppContext } from '../../../../App';

import { useAudioBuffer } from '../../../../services/audioBuffer';

import { WorkoutListItem } from '../Model';
import { State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import { deleteStorage } from '../../../../repositories/storage';
import AudioBufferSlider from '../../../../ui/AudioBufferSlider';
import { Delete } from '@mui/icons-material';

const WorkoutListRecordWorkoutRow = ({
  listItem,
}: {
  listItem: WorkoutListItem;
}) => {
  const { state, dispatch } = useContext(AppContext);
  const storagePath = useMemo(
    () => `/recordWorkout/${listItem.id}`,
    [listItem.id]
  );
  const audioBuffer = useAudioBuffer(
    storagePath,
    state,
    dispatch,
    true // isRemote
  );

  const handleDelete = () => {
    // app
    const updatedState = R.dissocPath<State>(['audioBuffers', storagePath])(
      state
    );
    dispatch({ type: ActionTypes.setState, payload: updatedState });

    // storage
    deleteStorage(storagePath);
  };

  if (!audioBuffer || !state.audioContext) return <></>;
  return (
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
          audioContext={state.audioContext}
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
  );
};

export default WorkoutListRecordWorkoutRow;
