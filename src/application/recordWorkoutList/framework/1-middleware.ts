import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { RootState } from '../../../main';
import { recordWorkoutListActions } from './0-reducer';

const fetchRecordWorkouts =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/fetchRecordWorkoutsStart': {
        const { audioContext } = (getState() as RootState).audio;
        const { currentUser } = (getState() as RootState).user;

        // workouts の取得
        const workouts =
          await services.api.recordWorkoutList.fetchRecordWorkouts(
            currentUser!.uid
          );

        // audioBuffers の取得
        const audioBuffers: { [id: string]: AudioBuffer } = {};
        await Promise.all(
          Object.keys(workouts).map(async (id) => {
            const path = `recordWorkout/${id}`;
            const audioBuffer =
              await services.api.recordWorkoutList.fetchAudioBuffer(
                path,
                audioContext!
              );
            if (audioBuffer) {
              audioBuffers[id] = audioBuffer;
            }
          })
        );
        dispatch(
          recordWorkoutListActions.fetchRecordWorkoutsSuccess({
            workouts,
            audioBuffers,
          })
        );
        break;
      }
      case 'recordWorkoutList/removeAudioBuffer': {
        const id = action.payload as string;
        await services.api.recordWorkoutList.deleteRecordWorkoutAudio(id);
        break;
      }
      default:
    }
  };

export default [fetchRecordWorkouts];
