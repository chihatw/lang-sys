import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { audioActions } from './0-reducer';
import { RootState } from '../../../main';
import { RECORD_WORKOUT_STORAGE_PATH } from '../../recordWorkouts/core/1-constants';
import { recordWorkoutListActions } from '../../recordWorkoutList/framework/0-reducer';

const audioMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/getAudioBufferPaths': {
        const workoutIds: string[] = action.payload.workoutIds;
        const { audioContext } = (getState() as RootState).audio;

        // audioBuffers の取得
        const audioBuffers: { [path: string]: AudioBuffer } = {};
        const audioBufferPaths: string[] = [];
        await Promise.all(
          workoutIds.map(async (id) => {
            const path = RECORD_WORKOUT_STORAGE_PATH + id;
            const audioBuffer = await services.api.audio.fetchAudioBuffer(
              path,
              audioContext!
            );
            if (audioBuffer) {
              audioBufferPaths.push(path);
              audioBuffers[path] = audioBuffer;
            }
          })
        );

        dispatch(audioActions.setAudioBuffers(audioBuffers));
        dispatch(
          recordWorkoutListActions.setAudioBufferPaths(audioBufferPaths)
        );

        break;
      }
      case 'recordWorkoutList/removeAudioBufferPath': {
        const path = action.payload as string;
        dispatch(audioActions.removeAudioBuffer(path));
        break;
      }
      case 'audio/removeAudioBuffer': {
        const path = action.payload as string;
        await services.api.audio.deleteStorageByPath(path);
        break;
      }
      default:
    }
  };

export default [audioMiddleware];
