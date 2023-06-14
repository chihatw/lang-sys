import chinSan_voice from 'assets/audios/chinSan_voice.mp3';
import recorded_voice from 'assets/audios/recordedVoice.mp3';

import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { audioActions } from './0-reducer';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';

import { RECORD_WORKOUT_STORAGE_PATH } from 'application/recordWorkouts/core/1-constants';
import { recordWorkoutPracticeActions } from 'application/recordWorkoutPractice/framework/0-reducer';
import { CHINESE_CUE_WORKOUT_STORAGE_PATH } from 'application/chineseCueWorkouts/core/1-constants';
import { chineseCueWorkoutPracticeActions } from 'application/chineseCueWorkoutPractice/framework/0-reducer';

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

        dispatch(audioActions.mergeFetchedAudioBuffers(audioBuffers));

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
      case 'audio/saveAudioBuffer': {
        const path = action.payload.path as string;
        const { blob } = (getState() as RootState).audio;
        if (!!blob) {
          await services.api.audio.uploadStorageByPath(blob, path);
          dispatch(audioActions.resetBlobAndAudioBuffer());
          break;
        }
      }
      case 'audio/removeFetchedAudioBuffer': {
        const path = action.payload as string;
        await services.api.audio.deleteStorageByPath(path);
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
      default:
    }
  };

export default [audioMiddleware];
