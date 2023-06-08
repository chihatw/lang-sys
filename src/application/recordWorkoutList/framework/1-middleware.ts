import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { RootState } from '../../../main';
import { recordWorkoutListActions } from './0-reducer';
import { recordWorkoutActions } from '../../recordWorkouts/framework/0-reducer';
import { RECORD_WORKOUT_STORAGE_PATH } from '../../recordWorkouts/core/1-constants';
import { audioActions } from '../../audio/framework/0-reducer';

const fetchRecordWorkouts =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      // todo recordWorkouts と audio に分けて処理したらどうなる？
      case 'recordWorkoutList/initiate': {
        const { audioContext } = (getState() as RootState).audio;
        const { currentUser } = (getState() as RootState).user;

        // workouts の取得
        const workouts = await services.api.recordWorkouts.fetchWorkouts(
          currentUser!.uid
        );

        // audioBuffers の取得
        const audioBuffers: { [path: string]: AudioBuffer } = {};
        const audioBufferPaths: string[] = [];
        await Promise.all(
          Object.keys(workouts).map(async (id) => {
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

        dispatch(recordWorkoutActions.setWorkouts(workouts));

        const workoutIds = Object.values(workouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout) => workout.id);

        dispatch(audioActions.setAudioBuffers(audioBuffers));
        dispatch(
          recordWorkoutListActions.setProps({
            workoutIds,
            audioBufferPaths,
          })
        );
        break;
      }
      default:
    }
  };

export default [fetchRecordWorkouts];
