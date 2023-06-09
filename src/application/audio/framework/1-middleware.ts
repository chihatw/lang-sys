import chinSan_voice from '../../../assets/audios/chinSan_voice.mp3';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { audioActions } from './0-reducer';
import { RootState } from '../../../main';
import { RECORD_WORKOUT_STORAGE_PATH } from '../../recordWorkouts/core/1-constants';
import { recordWorkoutPracticeActions } from '../../recordWorkoutPractice/framework/0-reducer';

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
        await Promise.all(
          workoutIds.map(async (id) => {
            const path = RECORD_WORKOUT_STORAGE_PATH + id;
            const audioBuffer =
              await services.api.audio.fetchStorageAudioBuffer(
                path,
                audioContext!
              );
            if (audioBuffer) {
              audioBuffers[path] = audioBuffer;
            }
          })
        );

        dispatch(audioActions.setAudioBuffers(audioBuffers));

        break;
      }
      case 'recordWorkoutList/removeAudioBufferStart': {
        const path = action.payload as string;
        dispatch(audioActions.removeAudioBuffer(path));
        break;
      }
      case 'audio/removeAudioBuffer': {
        const path = action.payload as string;
        await services.api.audio.deleteStorageByPath(path);
        break;
      }
      case 'recordWorkoutPractice/initiate': {
        const { audioContext, chenVoice } = (getState() as RootState).audio;
        // chenVoice が存在すれば、終了
        if (!!chenVoice) break;
        const audioBuffer = await services.api.audio.fetchLocalAudioBuffer(
          chinSan_voice,
          audioContext!
        );
        if (audioBuffer) {
          dispatch(audioActions.setChenVoice(audioBuffer));
        }
        break;
      }
      case 'recordWorkoutPractice/saveAudioBuffer': {
        const { workoutId, blob, audioBuffer } = (getState() as RootState)
          .recordWorkoutPractice;

        if (!!blob && !!audioBuffer) {
          const storagePath = RECORD_WORKOUT_STORAGE_PATH + workoutId;
          await services.api.audio.uploadStorageByPath(blob, storagePath);

          dispatch(
            audioActions.setAudioBuffers({ [storagePath]: audioBuffer })
          );

          dispatch(recordWorkoutPracticeActions.clearState());
        }

        break;
      }
      default:
    }
  };

export default [audioMiddleware];
