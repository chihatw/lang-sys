import chinSan_voice from '../../../assets/audios/chinSan_voice.mp3';
import recorded_voice from '../../../assets/audios/recordedVoice.mp3';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { audioActions } from './0-reducer';
import { RootState } from '../../../main';
import { RECORD_WORKOUT_STORAGE_PATH } from '../../recordWorkouts/core/1-constants';
import { recordWorkoutPracticeActions } from '../../recordWorkoutPractice/framework/0-reducer';
import { CHINESE_CUE_WORKOUT_STORAGE_PATH } from '../../chineseCueWorkouts/core/1-constants';
import { chineseCueWorkoutPracticeActions } from '../../chineseCueWorkoutPractice/framework/0-reducer';

const audioMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/getAudioBuffersStart':
      case 'chineseCueWorkoutList/getAudioBuffersStart': {
        const paths: string[] = action.payload.paths;
        const { fetchedAudioBuffers } = (getState() as RootState).audio;

        // audioBuffers の取得
        const audioBuffers: { [path: string]: AudioBuffer } = {};
        await Promise.all(
          paths.map(async (path) => {
            const fetchedAudioBuffer = fetchedAudioBuffers[path];
            // fetchedAudioBuffer が存在しない場合
            if (!fetchedAudioBuffer) {
              const gotAudioBuffer =
                await services.api.audio.fetchStorageAudioBuffer(path);
              if (gotAudioBuffer) {
                audioBuffers[path] = gotAudioBuffer;
              }
            }
          })
        );

        dispatch(audioActions.addFetchedAudioBuffers(audioBuffers));

        break;
      }
      case 'recordWorkoutList/removeStorageAudioBufferStart':
      case 'chineseCueWorkoutList/removeStorageAudioBufferStart': {
        const path = action.payload.path as string;
        await services.api.audio.deleteStorageByPath(path);
        dispatch(audioActions.removeStorageAudioBuffer(path));
        break;
      }
      case 'recordWorkoutPractice/initiate': {
        const { chenVoice } = (getState() as RootState).audio;
        // chenVoice が存在すれば、終了
        if (!!chenVoice) break;

        // chenVoice が存在しなければ、
        const audioBuffer = await services.api.audio.fetchLocalAudioBuffer(
          chinSan_voice
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
            audioActions.addFetchedAudioBuffers({ [storagePath]: audioBuffer })
          );

          dispatch(recordWorkoutPracticeActions.clearState());
        }

        break;
      }

      case 'chineseCueWorkoutPractice/initiate': {
        const { recordedVoice } = (getState() as RootState).audio;
        //  recordedVoice が存在すれば、終了
        if (!!recordedVoice) break;

        // recordedVoice が存在しなければ、
        const audioBuffer = await services.api.audio.fetchLocalAudioBuffer(
          recorded_voice
        );

        if (audioBuffer) {
          dispatch(audioActions.setRecordedVoice(audioBuffer));
        }
        break;
      }
      case 'chineseCueWorkoutPractice/saveAudioBuffer': {
        const { workoutId, blob, audioBuffer } = (getState() as RootState)
          .chineseCueWorkoutPractice;

        if (!!blob && !!audioBuffer) {
          const storagePath = CHINESE_CUE_WORKOUT_STORAGE_PATH + workoutId;
          await services.api.audio.uploadStorageByPath(blob, storagePath);

          dispatch(
            audioActions.addFetchedAudioBuffers({ [storagePath]: audioBuffer })
          );

          dispatch(chineseCueWorkoutPracticeActions.clearState());
        }

        break;
      }
      default:
    }
  };

export default [audioMiddleware];
