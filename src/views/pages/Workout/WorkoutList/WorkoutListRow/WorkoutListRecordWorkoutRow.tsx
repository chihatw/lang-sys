import * as R from 'ramda';
import { IconButton } from '@mui/material';

import { useContext } from 'react';
import { AppContext } from '../../../..';

import { WorkoutListItem } from '../Model';
import { State } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { deleteStorage } from '../../../../../repositories/storage';
import AudioBufferSlider from '../../../../components/AudioBufferSlider';
import { Delete } from '@mui/icons-material';

const WorkoutListRecordWorkoutRow = ({
  listItem,
}: {
  listItem: WorkoutListItem;
}) => {
  const { state, dispatch } = useContext(AppContext);
  const storagePath = `/recordWorkout/${listItem.id}`;

  const handleDelete = () => {
    // app
    const updatedState = R.dissocPath<State>(['audioBuffers', storagePath])(
      state
    );
    dispatch({ type: ActionTypes.setState, payload: updatedState });

    // storage
    deleteStorage(storagePath);
  };

  if (!listItem.audioBuffer || !state.audioContext) return <></>;
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
          audioBuffer={listItem.audioBuffer}
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
